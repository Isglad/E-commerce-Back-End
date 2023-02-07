const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });  
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      return res.status(404).json({ message: "No tag with this id! " });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    const tagWithProducts = await Tag.findByPk(tagData.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(tagWithProducts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const [updatedTag] = await Tag.update(req.body, {
      where: { id: req.params.id }
    });

    if(!updatedTag){
      return res.status(404).json({ message: "Tag not found!" });
    }

    const updatedTagData = await Tag.findByPk(req.params.id);

    return res.status(200).json(updatedTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({ 
      where: { id: req.params.id }
    });

    if (!deletedTag){
      return res.status(404).json({ message: "Tag not found" });
    }
    return res.status(200).json({ message: "Tag deleted successfully!" });
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
