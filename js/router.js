(function() {
  var FirefoxIM = window.FirefoxIM || {};

  FirefoxIM.Router = Backbone.Router.extend({
    
    initialize: function() {
      FirefoxIM.chatList = new FirefoxIM.Collections.ChatList(); 
      Backbone.history.start();
    },

    routes: {
      "chat/:id": "chat",
      "user/:id": "user",
      "settings/:id": "settings",
      "chatList/:id": "chatList",
      "*default": "chatList"
     /* "*default": "splashScreen" Enable this with splashScreen */
    },

    chatList: function(id) {
      this.renderParentView(FirefoxIM.Views.ChatListView, FirefoxIM.chatList);
    },

    chat: function(id) {
      this.renderParentView(FirefoxIM.ChatView, {
        model: this.chatList.get({chatId: id})
      });
    },

    user: function(id) {
      this.renderParentView(FirefoxIM.UserView,{
        model: {}
      });
    },

    settings: function() {
      this.renderParentView(FirefoxIM.SettingsView, {
        model: {}
      });
    },

    splashScreen: function() {
      //Load Persona or User credentials here
      //Load collections based on ID
      this.chatList = new FirefoxIM.Collections.ChatList();
      //this.userList = new FirefoxIM.UserList();
      // Ask for install
      //var install = new FirefoxIM.Views.InstallView();
      this.navigate('chatList/' + 10, {trigger: true}); // Mock userId
    },

    renderParentView: function(view, data, options) {
      if (this.currentView) {
        this.currentView.remove();
      }
      this.currentView = new view(data, options);
      this.currentView.render();
    }
  });

  window.FirefoxIM = FirefoxIM
}());