var emojoyApp = angular.module("emojoyApp", []);

let allEmojis;

function refreshUser(users) {
  angular.element($("body")[0]).scope().refreshUser(users)
}

function refreshChat(msg) {
  angular.element($("body")[0]).scope().refreshChat(msg)
  $("#chatarea > ul")[0].scrollTo(999999999999999, 999999999999);
}

emojoyApp.controller("ChatController", function ChatController($scope, $http) {
  $scope.username = ""
  $scope.users = []
  $scope.messages = []
  // Fetch Emojis
  $http.get("/emojis.json").then(function (response) {
    const emojis = response.data;
    allEmojis = Object.keys(emojis)
      .map((key) => emojis[key])
      .reduce((acc, e) => [...acc, ...e], []);
    $scope.emojis = allEmojis;
  });

  $scope.searchEmoji = function () {
    const searchValue = $scope.emojiSearch;
    $scope.emojis = allEmojis.filter((e) =>
      e.keywords.find((k) => k.includes(searchValue))
    );
  };

  $scope.addUser = function () {
    const username = $scope.username;
    socketUserJoin(username)
  };

  $scope.refreshUser = function (users) {
    $scope.$apply(function () {
      $scope.users = users;
      console.log(users)
    })
  }

  $scope.refreshChat = function (messages) {
    $scope.$apply(function () {
      $scope.messages = messages;
      console.log(messages);
    })
  }

  $scope.random = function () {
    return Math.floor(Math.random() * 5);
  }

  $scope.sendEmoji = function ($event) {
    const emoji = $event.currentTarget.innerText;
    const message = {
      body: emoji,
      from: $scope.username
    }
    socketSendEmoji(message)
  }

  setTimeout(() => {
    $(".ui.modal").modal("show");
  }, 0);
});
