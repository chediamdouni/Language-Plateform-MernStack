from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import pickle
import nltk
from nltk.stem import WordNetLemmatizer
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model and preprocessed data
model = load_model("chatbot_model.h5")
words = pickle.load(open("words.pkl", "rb"))
classes = pickle.load(open("classes.pkl", "rb"))
intents = json.loads(open("intents.json").read())

lemmatizer = WordNetLemmatizer()


def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words


def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)


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


def get_response(intents_list, intents_json):
    tag = intents_list[0]["intent"]
    list_of_intents = intents_json["intents"]
    for i in list_of_intents:
        if i["tag"] == tag:
            result = np.random.choice(i["responses"])
            break
    return result


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data["message"]
    ints = predict_class(message)
    res = get_response(ints, intents)
    return jsonify({"response": res})


if __name__ == "__main__":
    app.run(debug=True, port=8000)
