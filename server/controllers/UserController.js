const { validationResult } = require("express-validator");
const User = require("../models/User");
const deleteFile = require("../utils/imageDelete");
// UPDATE USER  ///
const editUserProfile = async (req, res, next) => {
  try {
    console.log("Début de editUserProfile");
    console.log("userId:", req.params.userId);
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Mise à jour des champs de base
    if (req.body.username) user.username = req.body.username.toLowerCase();
    if (req.body.email) user.email = req.body.email.toLowerCase();
    if (req.body.aboutMe !== undefined) user.aboutMe = req.body.aboutMe;

    // Gestion des champs optionnels
    if (req.body.dateOfBirth) user.dateOfBirth = new Date(req.body.dateOfBirth);
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.experience) user.experience = Number(req.body.experience);
    if (req.body.language) user.language = req.body.language;
    if (req.body.country) user.country = req.body.country;

    // Gestion du mot de passe (si fourni)
    if (req.body.password) {
      // Assurez-vous d'avoir une méthode pour hasher le mot de passe
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.file) {
      if (user.profileImage) {
        try {
          console.log("Tentative de suppression de l'ancienne image");
          await deleteFile(user.profileImage);
          console.log("Ancienne image supprimée avec succès ou non trouvée");
        } catch (error) {
          console.error(
            "Erreur lors de la suppression de l'ancienne image:",
            error
          );
        }
      }
      user.profileImage = req.file.path.replace(/\\/g, "/");
      console.log("Nouveau chemin d'image:", user.profileImage);
    }

    await user.save();
    console.log("Utilisateur sauvegardé avec succès");

    // Retourner l'utilisateur mis à jour sans le mot de passe
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong in the editUserProfile" });
  }
};

// DELETE USER  ///
const deleteUser = async (req, res, next) => {
  try {
    let user = await User.findOneAndDelete(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "user not found " });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.log("Error when Deleting user ", error);
  }
};

// USER DETAILS ///
const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "No User Found" });
    }

    return res.status(200).json({ user });
  } catch (e) {
    res.status(500).json({ message: "something went wrong in getUserInfo" });
  }
};

// ALL USERS ///
const getAllUsersInfo = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "no users found " });
  }
};

const addFavoriteTutor = async (req, res) => {
  try {
    const { tutorId, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    if (!user.favoriteTutors.includes(tutorId)) {
      user.favoriteTutors.push(tutorId);
      await user.save();
      res.status(200).json({ message: "Tutor added to favorites" });
    } else {
      res.status(400).json({ message: "Tutor already in favorites" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFavoriteTutor = async (req, res) => {
  try {
    const { tutorId, userId } = req.body;
    console.log("response", req.body);
    const user = await User.findById(userId);
    console.log("user", user);
    user.favoriteTutors.pull(tutorId);
    await user.save();
    res.status(200).json({ message: "Tutor removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFavoriteCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    const user = await User.findById(userId);
    if (!user.favoriteCourses.includes(courseId)) {
      user.favoriteCourses.push(courseId);
      await user.save();
      res.status(200).json({ message: "Course added to favorites" });
    } else {
      res.status(400).json({ message: "Course already in favorites" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFavoriteCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    const user = await User.findById(userId);
    user.favoriteCourses.pull(courseId);
    await user.save();
    res.status(200).json({ message: "Course removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Fetching favorites for user:", userId);
    const user = await User.findById(userId)
      .populate("favoriteTutors")
      .populate("favoriteCourses");

    if (!user) {
      console.log("User not found:", userId);
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    console.log("User favorites:", user.favoriteTutors, user.favoriteCourses);

    res.status(200).json({
      favoriteTutors: user.favoriteTutors,
      favoriteCourses: user.favoriteCourses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  editUserProfile,
  deleteUser,
  getAllUsersInfo,
  getUserInfo,
  addFavoriteTutor,
  removeFavoriteTutor,
  removeFavoriteCourse,
  addFavoriteCourse,
  getUserFavorites,
};
