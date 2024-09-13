import numpy as np
import random
import json
import pickle
import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import SGD
import tensorflow as tf

print(tf.__version__)
nltk.download("punkt_tab")
nltk.download("punkt")
nltk.download("wordnet")

lemmatizer = WordNetLemmatizer()

# Load your intents file
with open("intents.json") as file:
    intents = json.load(file)

words = []
classes = []
documents = []
ignore_chars = ["?", "!", ".", ","]

# Preprocess the data
for intent in intents["intents"]:
    for pattern in intent["patterns"]:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent["tag"]))
        if intent["tag"] not in classes:
            classes.append(intent["tag"])

words = [
    lemmatizer.lemmatize(word.lower()) for word in words if word not in ignore_chars
]
words = sorted(list(set(words)))
classes = sorted(list(set(classes)))

# Save preprocessed data
pickle.dump(words, open("words.pkl", "wb"))
pickle.dump(classes, open("classes.pkl", "wb"))

# Prepare training data
training = []
output_empty = [0] * len(classes)

for doc in documents:
    bag = []
    word_patterns = doc[0]
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)

    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1
    training.append([bag, output_row])

random.shuffle(training)
training = np.array(training, dtype=object)

train_x = list(training[:, 0])
train_y = list(training[:, 1])

# Build the model
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),), activation="relu"))
model.add(Dropout(0.5))
model.add(Dense(64, activation="relu"))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation="softmax"))

# Compile the model
sgd = SGD(learning_rate=0.01, momentum=0.9, nesterov=True)
model.compile(loss="categorical_crossentropy", optimizer=sgd, metrics=["accuracy"])

# Train the model
hist = model.fit(
    np.array(train_x), np.array(train_y), epochs=200, batch_size=5, verbose=1
)

# Save the model
model.save("chatbot_model.h5")
print("Model saved")


# Function to clean up sentence
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words


# Function to convert sentence to bag of words
def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)


# Function to predict intent
def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list


# Function to get response
def get_response(intents_list, intents_json):
    tag = intents_list[0]["intent"]
    list_of_intents = intents_json["intents"]
    for i in list_of_intents:
        if i["tag"] == tag:
            result = random.choice(i["responses"])
            break
    return result


# Chat function
def chat():
    print("Bot: Hi there! How can I assist you today? (type 'quit' to exit)")
    while True:
        inp = input("You: ")
        if inp.lower() == "quit":
            break

        ints = predict_class(inp)
        res = get_response(ints, intents)
        print("Bot:", res)


if __name__ == "__main__":
    chat()
