import Attachment from "../models/Attachment";

class AttachmentController {
  async create(req, res) {
    const { originalname, filename } = req.file;
    const attachment = await Attachment.create({
      name: originalname,
      file: filename,
    });
    return res.json(attachment);
  }
}

export default new AttachmentController();
