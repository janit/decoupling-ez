new Vue({
  el: '#app',
  data: {
    message: '',
    rides: [
        {
            'image': 'images/toulousse.png',
            'title': 'title 1',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30 Km',
            'level': 'easy'
        },
        {
            'image': 'images/toulousse.png',
            'title': 'title 2',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30 Km',
            'level': 'easy'
        },
        {
            'image': 'images/toulousse.png',
            'title': 'title 3',
            'author': 'da author',
            'route': 'Lyon Toulousse',
            'distance': '30 Km',
            'level': 'easy'
        },
    ]
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

    this.capi.logIn(function (error, response) {
        if ( error ) {
            this.message = 'login failed';
            return;
        }
        this.message = 'login succesful';
    });

    this.refreshBikerideList();

  },
  
  methods: {

    refreshBikerideList: function(){
        console.log('load the list of rides here!');
    }

  }

})