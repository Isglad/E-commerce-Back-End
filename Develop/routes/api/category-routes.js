const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });  
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      return res.status(404).json({ message: "No category with this id! " });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/', async (req, res) => {
//   // create a new category
//   /* req.body should look like this...
//     {
//       "category_name": "Electronics"
//     }
//   */
//   try {
//     const categoryData = await Category.create(req.body);
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    const categoryWithProducts = await Category.findByPk(categoryData.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryWithProducts);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  /* req.body should look like this...
    {
      "category_name": "Games"
    }
  */
  try {
    const [updatedCategory] = await Category.update(req.body, {
      where: { id: req.params.id }
    });

    if(!updatedCategory){
      return res.status(404).json({ message: "Category not found!" });
    }

    const updatedCategoryData = await Category.findByPk(req.params.id);

    return res.status(200).json(updatedCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json({ message: "Category deleted successfully"});
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.delete('/:id', async (req, res) => {
//   // delete a category by its `id` value
//   try {
//     const categoryDeleted = await Category.destroy({
//       where: {
//         id: req.params.id,
//       },
//       cascade: true,
//     });

//     if (!categoryDeleted) {
//       res.status(404).json({ message: 'No category found with that id!' });
//       return;
//     }

//     res.status(200).json({ message: "Category deleted successfully"});
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;
