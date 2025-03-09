"use strict";

//  Logout
const logoutButton = new LogoutButton();

logoutButton.action = function() {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    } else {
      console.error('Logout failed:', response.error);
    }
  });
};

//  User Information
function getCurrentUser() {
  ApiConnector.current((response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    } else {
      console.error('Failed to get current user:', response.error);
    }
  });
}

getCurrentUser();

// Current Exchange Rates
const ratesBoard = new RatesBoard();

function updateRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      console.error('Failed to get rates:', response.error);
    }
  });
}

// Update Rates Per Minutes!!!
updateRates();
setInterval(updateRates, 60000);

// Transactions
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage('Balance replenished successfully');
    } else {
      moneyManager.setMessage(`Failed to replenish balance: ${response.error}`);
    }
  });
};

moneyManager.conversionMoneyCallback = function(data) {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage('Currency converted successfully');
    } else {
      moneyManager.setMessage(`Failed to convert currency: ${response.error}`);
    }
  });
};

moneyManager.sendMoneyCallback = function(data) {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage('Money transferred successfully');
    } else {
      moneyManager.setMessage(`Failed to transfer money: ${response.error}`);
    }
  });
};

// Favorites
const favoritesWidget = new FavoritesWidget();

function updateFavorites() {
  ApiConnector.getFavorites((response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      favoritesWidget.updateUsersList(response.data);
    } else {
      console.error('Failed to get favorites:', response.error);
    }
  });
}

updateFavorites();

favoritesWidget.addUserCallback = function(data) {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      updateFavorites();
      favoritesWidget.setMessage('User added to favorites successfully');
    } else {
      favoritesWidget.setMessage(`Failed to add user to favorites: ${response.error}`);
    }
  });
};

favoritesWidget.removeUserCallback = function(data) {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      updateFavorites();
      favoritesWidget.setMessage('User removed from favorites successfully');
    } else {
      favoritesWidget.setMessage(`Failed to remove user from favorites: ${response.error}`);
    }
  });
};
