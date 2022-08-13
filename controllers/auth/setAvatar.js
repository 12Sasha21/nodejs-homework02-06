const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const avatarsDir = path.join(basedir, "public", "avatars");

const setAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempPath, originalname } = req.file; // tempPath-де знаходиться аватар, originalname-під яким імям
    const resizeImg = await Jimp.read(tempPath);
    resizeImg.resize(250, 250).write(tempPath);
    const [extension] = originalname.split(".").reverse();
    const newName = `${_id}.${extension}`; // унікальне імя
    const uploadPath = path.join(avatarsDir, newName); // папка де має зберігатися аватар
    await fs.rename(tempPath, uploadPath); // переміщаємо аватар
    const avatarURL = path.join("avatars", newName); // запамятовуємо шлях
    await User.findByIdAndUpdate(_id, { avatarURL }); // оновлюємо аватар
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path); // видаляємо файл
    throw error;
  }
};

module.exports = setAvatar;
