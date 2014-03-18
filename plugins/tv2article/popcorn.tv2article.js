/*global Popcorn, document,$ */
(function( Popcorn ) {

    var API_URL = 'http://labrador.tv2.no.dev.lbrdr.com/api/v1/article/106938';
    Popcorn.plugin( "tv2article", function() {
        return {
            timeupdate: function(){
                console.log('seriously timeupdate');
            },
            _setup: function( options ) {
                var element = $("<div class='text-inner-div left'></div>");
                var target = Popcorn.dom.find( options.target );
                if ( !target ) {
                    target = this.media.parentNode;
                }
                options._target = target;
                console.log('target: ', target);
                $.ajax({
                    url: API_URL+options.articleId, 
                    success: function(data){
                        console.log('data: ', data);
                        element.html("<pre>"+data.result+"</pre>");
                        options._container = element[0];
                        target.appendChild(options._container);
                    },
                    dataType: "json",
                    jsonp: true
                });
                options._container = element[0];
            },
            start: function() {
            },
            end: function() {
            },
            _teardown: function( /*options*/ ) {
            },
        };
        },{
        "options": {
            "start": {
                "elem": "input",
                "type": "text",
                "label": "In",
                "units": "seconds"
            },
            "end": {
                "elem": "input",
                "type": "text",
                "label": "Out",
                "units": "seconds"
            },
        left: {
          elem: "input",
          type: "number",
          label: "Left",
          units: "%",
          "default": 25,
          hidden: true
        },
        top: {
          elem: "input",
          type: "number",
          label: "Top",
          units: "%",
          "default": 0,
          hidden: true
        },
        width: {
          elem: "input",
          type: "number",
          units: "%",
          label: "Width",
          "default": 50,
          hidden: true
        },
        zindex: {
          hidden: true
        },
        articleId: {
          elem: "input",
          type: "text",
          label: "Article URL"
        }
            /*,
            "target": {
                "hidden": false
            }*/
        }
    });
}(Popcorn));
