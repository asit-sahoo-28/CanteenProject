
import foodModel from "../models/foodModel.js";
import fs from "fs";


const generateProductDescription = async (req, res) => {
  try {
    const { name } = req.body;

const templates = [
  `${name} is a perfectly crafted dish made with fresh ingredients, delivering rich flavors and a satisfying taste in every bite.`,

  `Indulge in the delicious taste of ${name}, prepared with care and high-quality ingredients for an unforgettable experience.`,

  `${name} offers a delightful combination of freshness and flavor, making it a perfect choice for any time of the day.`,

  `Savor the irresistible taste of ${name}, made with premium ingredients and cooked to perfection for maximum enjoyment.`,

  `${name} is a flavorful dish that blends freshness and taste, giving you a satisfying and enjoyable meal every time.`,

  `Enjoy the rich and authentic taste of ${name}, carefully prepared using quality ingredients for a delightful experience.`,

  `${name} is a mouth-watering dish designed to satisfy your cravings with its perfect balance of taste and freshness.`,

  `Experience the goodness of ${name}, a delicious dish made with care to bring you maximum flavor and satisfaction.`,

  `${name} is freshly prepared using the finest ingredients, ensuring a tasty and fulfilling meal every time you order.`,

  `Treat yourself to the amazing flavors of ${name}, crafted to perfection for a rich and satisfying experience.`,

  `${name} brings you a perfect blend of taste and quality, making it a must-try dish for every food lover.`,

  `Enjoy the delicious goodness of ${name}, made with fresh ingredients and served with rich and delightful flavors.`,

  `${name} is a tasty and satisfying dish that combines quality ingredients with expert preparation for the best results.`,

  `Discover the unique taste of ${name}, a dish prepared with passion and care to deliver a memorable experience.`,

  `${name} is a perfect choice for those who love fresh, flavorful, and satisfying meals made with high-quality ingredients.`,

  `Relish the rich flavors of ${name}, crafted to bring you a delicious and enjoyable dining experience.`,

  `${name} is prepared fresh with premium ingredients, offering a delightful taste that keeps you coming back for more.`,

  `Taste the perfection of ${name}, a dish that combines freshness, quality, and amazing flavor in every bite.`,

  `${name} is a delicious option made with care and quality ingredients, perfect for satisfying your hunger and cravings.`,

  `Enjoy every bite of ${name}, a flavorful dish made fresh to give you a satisfying and delightful meal experience.`,
];

    const randomText =
      templates[Math.floor(Math.random() * templates.length)];

    res.json({
      success: true,
      data: randomText,
    });

  } catch (error) {
    res.json({
      success: false,
      message: "AI failed",
    });
  }
};



// const generateFoodSuggestion = async (req, res) => {
//   try {
//     const { mood, mealType, preference } = req.body;

//     const foods = await foodModel.find({ isAvailable: true });

//     if (!foods.length) {
//       return res.json({
//         success: false,
//         message: "No food available",
//       });
//     }

//     const filtered = foods.filter((food) => {
//       return (
//         !preference ||
//         food.category.toLowerCase() === preference.toLowerCase()
//       );
//     });

//     const finalList = filtered.length ? filtered : foods;

//     const suggestions = finalList.map((food) => {
//       return `🍽️ Try ${food.name} - ${food.description}. Perfect for ${mealType || "any time"} when you're feeling ${mood || "hungry"}!`;
//     });

//     const result = suggestions
//       .sort(() => 0.5 - Math.random())
//       .slice(0, 3);

//     res.json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "Suggestion failed",
//     });
//   }
// };




const generateFoodSuggestion = async (req, res) => {
  try {
    const { mood } = req.body;

    const foods = await foodModel.find({ isAvailable: true });

    if (!foods || foods.length === 0) {
      return res.json({
        success: false,
        data: ["😔 No food available"],
      });
    }

    let filtered = foods;

    // 🔥 MOOD MAP
    const moodMap = {
      angry: ["Spicy", "Fast Food"],
      hungry: ["Meals", "Combos / Thali"],
      happy: ["Desserts", "Snacks"],
      lazy: ["Fast Food", "Beverages"],
      healthy: ["Healthy Food", "Veg"],
      morning: ["Breakfast"],
      afternoon: ["Meals"],
      night: ["Fast Food", "Snacks"],
    };

    if (mood && moodMap[mood]) {
      const moodFiltered = foods.filter((food) =>
        moodMap[mood].some((tag) =>
          food.category.toLowerCase().includes(tag.toLowerCase())
        )
      );

      // ✅ IMPORTANT FIX
      if (moodFiltered.length >= 2) {
        filtered = moodFiltered;
      }
    }

    // 🔥 SHUFFLE (BETTER RANDOM)
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);

    // 🔥 ALWAYS RETURN 3–4 ITEMS
    let result = shuffled.slice(0, 4);

    // fallback if less items
    if (result.length < 3) {
      const extra = foods
        .filter((f) => !result.includes(f))
        .sort(() => Math.random() - 0.5)
        .slice(0, 4 - result.length);

      result = [...result, ...extra];
    }

    // ✅ RETURN ONLY NAMES
    const finalResult = result.map((food) => food.name);

    res.json({
      success: true,
      data: finalResult,
    });

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      data: ["⚠️ Error fetching suggestions"],
    });
  }
};










const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }


const food = new foodModel({
  name: req.body.name,
  description: req.body.description,
  price: req.body.price,
  category: req.body.category,
  image: req.file.path,

  isAvailable: true,
  stock: 20,
  isFlashSale: false,
});




    await food.save();

    res.json({
      success: true,
      message: "Food Added",
    });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({
      success: false,
      message: "Error adding food",
    });
  }
};



// All food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error("Error fetching food list:", error);
    res.status(500).json({ success: false, message: "Error fetching food list" });
  }
};

// Remove food items
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (food) {
      fs.unlink(`uploads/${food.image}`, () => {});
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food Removed" });
    } else {
      res.status(404).json({ success: false, message: "Food not found" });
    }
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};



// Toggle Availability
const toggleAvailability = async (req, res) => {
  const food = await foodModel.findById(req.body.id);
  food.isAvailable = !food.isAvailable;
  await food.save();

  res.json({
    success: true,
    message: food.isAvailable
      ? "Item Available"
      : "Item Unavailable",
  });
};

// Toggle Flash Sale
const toggleFlashSale = async (req, res) => {
  const food = await foodModel.findById(req.body.id);
  food.isFlashSale = !food.isFlashSale;
  await food.save();

  res.json({
    success: true,
    message: food.isFlashSale
      ? "Flash Sale ON"
      : "Flash Sale OFF",
  });
};

export { addFood, listFood, removeFood,toggleAvailability,toggleFlashSale, generateProductDescription,generateFoodSuggestion };
