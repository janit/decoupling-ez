new Vue({
  el: '#app',
  data: {
    message: '',
    searchWord: '',
    rides: [
        {
            'image': 'images/toulousse.png',
            'title': 'title 1',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30',
            'level': 'easy'
        },
        {
            'image': 'images/toulousse.png',
            'title': 'title 2',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30',
            'level': 'easy'
        },
        {
            'image': 'images/toulousse.png',
            'title': 'title 3',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30',
            'level': 'easy'
        },
    ],    
    rides: [],
    capi: false,
    contentService: false
  },

  created: function(){

    var credentials = {
        login: 'admin',
        password: 'publish'
    };

    this.capi = new eZ.CAPI(
        'http://headless.websc',
        new eZ.SessionAuthAgent(credentials)
    )

    this.contentService = this.capi.getContentService();

    that = this;

    this.capi.logIn(function (error, response) {
        if ( error ) {
            that.message = 'login failed';
            return;
        }

        that.message = 'log in ok!';
        that.refreshBikerideList();

    });

  },
  
  methods: {

    refreshBikerideList: function(){

        console.log('do search');

    }

  }

});

