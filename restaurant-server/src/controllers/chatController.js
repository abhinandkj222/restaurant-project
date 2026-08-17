const foodModel = require('../models/foodModel');

const getPriceLimit = (message) => {
  const patterns = [
    /under\s*₹?\s*(\d+)/i,
    /below\s*₹?\s*(\d+)/i,
    /less\s*than\s*₹?\s*(\d+)/i,
    /within\s*₹?\s*(\d+)/i,
    /₹\s*(\d+)\s*(?:or\s*)?less/i,
    /(\d+)\s*(?:rs|rupees)\s*(?:or\s*)?less/i,
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);

    if (match) {
      return Number(match[1]);
    }
  }

  return null;
};

const formatPrice = (price) => {
  return `₹${Number(price).toFixed(0)}`;
};

const formatFoodList = (foods) => {
  return foods
    .slice(0, 5)
    .map(
      (food) =>
        `• ${food.name} — ${formatPrice(food.price)}${
          food.rating ? ` ⭐ ${food.rating}` : ''
        }`,
    )
    .join('\n');
};

const findMatchingFoods = (foods, message) => {
  const words = message
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 3);

  return foods.filter((food) => {
    const searchableText = `
      ${food.name || ''}
      ${food.description || ''}
      ${food.category || ''}
    `.toLowerCase();

    return words.some((word) => searchableText.includes(word));
  });
};

const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'message is required',
      });
    }

    const userMessage = message.trim();
    const lowerMessage = userMessage.toLowerCase();

    const foods = await foodModel.getFoods();

    const availableFoods = foods.filter((food) => food.is_available === true);

    /*
     * Greeting
     */
    if (
      /^(hi|hello|hey|hii|hai|good morning|good afternoon|good evening)\b/i.test(
        userMessage,
      )
    ) {
      return res.json({
        success: true,
        reply:
          'Hi! 👋 Welcome to our restaurant! I can help you find food, check prices, recommend dishes, and answer questions about our menu. What would you like?',
      });
    }

    /*
     * Help
     */
    if (
      lowerMessage.includes('what can you do') ||
      lowerMessage.includes('help me') ||
      lowerMessage === 'help'
    ) {
      return res.json({
        success: true,
        reply:
          'I can help you with:\n\n• 🍔 Find food\n• 💰 Check prices\n• ⭐ Recommend popular food\n• 🌱 Find vegetarian options\n• 🌶️ Find spicy food\n• 🏷️ Find food under a budget\n• 📋 Show our menu\n\nJust ask me naturally!',
      });
    }

    /*
     * Menu
     */
    if (
      lowerMessage.includes('show menu') ||
      lowerMessage.includes('full menu') ||
      lowerMessage === 'menu' ||
      lowerMessage.includes('what food do you have') ||
      lowerMessage.includes('what do you have')
    ) {
      const menuFoods = availableFoods.slice(0, 10);

      if (!menuFoods.length) {
        return res.json({
          success: true,
          reply: 'Sorry, there are currently no available foods.',
        });
      }

      return res.json({
        success: true,
        reply: `Here are some of our available foods:\n\n${formatFoodList(
          menuFoods,
        )}\n\nYou can also ask me for food under a specific budget.`,
      });
    }

    /*
     * Budget search
     */
    const priceLimit = getPriceLimit(userMessage);

    if (priceLimit !== null) {
      const budgetFoods = availableFoods
        .filter((food) => Number(food.price) <= priceLimit)
        .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));

      if (!budgetFoods.length) {
        return res.json({
          success: true,
          reply: `I couldn't find any available food under ₹${priceLimit}. Try increasing your budget a little. 😊`,
        });
      }

      return res.json({
        success: true,
        reply: `Sure! Here are some options under ₹${priceLimit}:\n\n${formatFoodList(
          budgetFoods,
        )}\n\nWould you like me to recommend the best one?`,
      });
    }

    /*
     * Vegetarian search
     */
    if (
      lowerMessage.includes('vegetarian') ||
      lowerMessage.includes('veg food') ||
      lowerMessage.includes('veg option')
    ) {
      const vegetarianFoods = availableFoods.filter((food) => {
        const text = `
          ${food.name || ''}
          ${food.description || ''}
          ${food.category || ''}
        `.toLowerCase();

        return (
          text.includes('veg') ||
          text.includes('vegetarian') ||
          text.includes('paneer') ||
          text.includes('mushroom') ||
          text.includes('cheese')
        );
      });

      if (!vegetarianFoods.length) {
        return res.json({
          success: true,
          reply:
            "I couldn't find vegetarian items from the available menu right now.",
        });
      }

      return res.json({
        success: true,
        reply: `Here are some vegetarian options:\n\n${formatFoodList(
          vegetarianFoods,
        )}`,
      });
    }

    /*
     * Spicy food
     */
    if (
      lowerMessage.includes('spicy') ||
      lowerMessage.includes('hot food') ||
      lowerMessage.includes('spicy food')
    ) {
      const spicyFoods = availableFoods.filter((food) => {
        const text = `
          ${food.name || ''}
          ${food.description || ''}
        `.toLowerCase();

        return (
          text.includes('spicy') ||
          text.includes('peri peri') ||
          text.includes('chilli') ||
          text.includes('chili') ||
          text.includes('hot')
        );
      });

      if (!spicyFoods.length) {
        return res.json({
          success: true,
          reply:
            "I couldn't find any clearly marked spicy items. You can check our full menu for more options.",
        });
      }

      return res.json({
        success: true,
        reply: `🌶️ If you like spicy food, you can try:\n\n${formatFoodList(
          spicyFoods,
        )}`,
      });
    }

    /*
     * Popular / recommendation
     */
    if (
      lowerMessage.includes('popular') ||
      lowerMessage.includes('recommend') ||
      lowerMessage.includes('best food') ||
      lowerMessage.includes('what should i eat') ||
      lowerMessage.includes('what do you recommend')
    ) {
      let popularFoods = await foodModel.getPopularFoods();

      if (!popularFoods.length) {
        popularFoods = [...availableFoods]
          .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
          .slice(0, 5);
      }

      if (!popularFoods.length) {
        return res.json({
          success: true,
          reply:
            "I don't have enough information to recommend a dish right now. Please check our menu.",
        });
      }

      return res.json({
        success: true,
        reply: `⭐ Here are some popular choices:\n\n${formatFoodList(
          popularFoods,
        )}\n\nI'd recommend the first one if you want to try something popular! 😋`,
      });
    }

    /*
     * Search food by name/category/description
     */
    const matchingFoods = findMatchingFoods(availableFoods, lowerMessage);

    if (matchingFoods.length) {
      return res.json({
        success: true,
        reply: `I found these for you:\n\n${formatFoodList(matchingFoods)}`,
      });
    }

    /*
     * Price questions
     */
    if (
      lowerMessage.includes('price') ||
      lowerMessage.includes('cost') ||
      lowerMessage.includes('how much')
    ) {
      return res.json({
        success: true,
        reply:
          'Sure! Tell me the name of the food you are interested in, and I can check its current price for you. 😊',
      });
    }

    /*
     * Order questions
     */
    if (
      lowerMessage.includes('how to order') ||
      lowerMessage.includes('place an order') ||
      lowerMessage.includes('order food')
    ) {
      return res.json({
        success: true,
        reply:
          'Ordering is easy! 🛒 Browse our menu, select your food, add it to your cart, and proceed to checkout. You can then choose your available payment and delivery options.',
      });
    }

    /*
     * Delivery questions
     */
    if (lowerMessage.includes('delivery') || lowerMessage.includes('deliver')) {
      return res.json({
        success: true,
        reply:
          'Yes! 🚴 You can place your order through our website. Delivery availability and charges will be shown during checkout.',
      });
    }

    /*
     * Thank you
     */
    if (
      lowerMessage.includes('thank you') ||
      lowerMessage === 'thanks' ||
      lowerMessage === 'thank'
    ) {
      return res.json({
        success: true,
        reply:
          "You're very welcome! 😊 Let me know if you need help choosing something delicious.",
      });
    }

    /*
     * Default response
     */
    return res.json({
      success: true,
      reply:
        "I'm not completely sure what you're looking for. 🤔 Try asking something like:\n\n• What do you recommend?\n• Show me vegetarian food\n• What can I get under ₹300?\n• Show me spicy food\n• What food do you have?\n• How do I order?",
    });
  } catch (error) {
    console.error('chat error:', error);

    return res.status(500).json({
      success: false,
      message: 'failed to process chat',
    });
  }
};

module.exports = {
  chat,
};
