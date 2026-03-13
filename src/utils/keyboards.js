/**
 * Telegram Inline Keyboards - FIXED VERSION
 * These are buttons that appear BELOW messages (not persistent keyboard)
 */

function mainMenu() {
  return {
    inline_keyboard: [
      [{ text: "🔍 Search Products", callback_data: "action_search" }],
      [{ text: "🌿 Why Industrial Cannabis?", callback_data: "action_why" }],
      [
        { text: "📊 Statistics", callback_data: "action_stats" },
        { text: "ℹ️ About", callback_data: "action_about" }
      ],
      [{ text: "💡 Contribute", callback_data: "action_contribute" }]
    ]
  }
}

function quickSearch() {
  return {
    inline_keyboard: [
      [
        { text: "🍶 Bottles", callback_data: "search_bottles" },
        { text: "👕 Clothing", callback_data: "search_clothing" }
      ],
      [
        { text: "🛍️ Bags", callback_data: "search_bags" },
        { text: "🏠 Insulation", callback_data: "search_insulation" }
      ],
      [
        { text: "🎨 Paint", callback_data: "search_paint" },
        { text: "📄 Paper", callback_data: "search_paper" }
      ],
      [{ text: "⬅️ Back to Menu", callback_data: "action_menu" }]
    ]
  }
}

function comparisonActions(product) {
  return {
    inline_keyboard: [
      [{ text: "🔄 Search Another", callback_data: "action_search" }],
      [
        { text: "📤 Share", callback_data: `share_${product}` },
        { text: "👍 Helpful", callback_data: `feedback_${product}_1` }
      ],
      [{ text: "⬅️ Menu", callback_data: "action_menu" }]
    ]
  }
}

function searchAgain() {
  return {
    inline_keyboard: [
      [{ text: "🔄 Try Another Search", callback_data: "action_search" }],
      [{ text: "⬅️ Back to Menu", callback_data: "action_menu" }]
    ]
  }
}

function backToMain() {
  return {
    inline_keyboard: [
      [{ text: "⬅️ Back to Menu", callback_data: "action_menu" }]
    ]
  }
}

function aboutActions() {
  return {
    inline_keyboard: [
      [{ text: "🔍 Start Searching", callback_data: "action_search" }],
      [{ text: "🌿 Why Cannabis?", callback_data: "action_why" }],
      [{ text: "⬅️ Menu", callback_data: "action_menu" }]
    ]
  }
}

module.exports = {
  mainMenu,
  quickSearch,
  comparisonActions,
  searchAgain,
  backToMain,
  aboutActions
}