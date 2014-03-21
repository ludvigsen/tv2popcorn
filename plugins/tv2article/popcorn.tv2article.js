/*global Popcorn, document,$ */
(function( Popcorn ) {

    var API_URL = 'http://rest.tv2.no/cms-feeds-dw-rest/cms/article/?feedType=json&id=',
        LOGO_URL = '/external/tv2popcorn/plugins/tv2article/tv2logo.png',
        element = $("<div class='text-custom'>LEGG INN ARTIKKELID</div>");
    Popcorn.plugin( "tv2article", function() {
        return {
            timeupdate: function(){
                console.log('seriously timeupdate');
            },
            _setup: function( options ) {
                element.hide();
                element.css('z-index', options.zindex);
                element.css('color', 'black');
                element.css('width', 'auto');
				element.addClass(options.class);
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
                        if(data.result.length > 0){
                            var res = data.result[0];
                            element.html("<img src='"+LOGO_URL+"'><a target='"+ options.linktarget+"' href='"+res.published_url+"'>"+res.title+"</a>");
                        }
                    },
                    dataType: "jsonp"
                });
                options._container = element[0];
                options._container.style.left = options.left + "%";
                options._container.style.bottom = options.bottom + "%";
                options._container.style.position = "absolute";
                if ( options.width ) {
                    options._container.style.width = options.width + "%";
                }

                target.appendChild(options._container);
            },
            start: function() {
                element.show();
                console.log('START!');
            },
            end: function() {
                element.hide();
                console.log('STOP!');
            },
            _teardown: function( options ) {
                if ( options._target ) {
                    options._target.removeChild( options._container );
                }
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
			  hidden: false,
			  "default": 25
			},
			bottom: {
			  elem: "input",
			  type: "number",
			  label: "Bottom",
			  units: "%",
			  hidden: false,
			  "default": 10
			},
			width: {
			  elem: "input",
			  type: "number",
			  units: "%",
			  label: "Width",
			  hidden: false,
			  "default": 50
			},
			zindex: {
			  hidden: true
			},
			articleId: {
			  elem: "input",
			  type: "text",
			  label: "Article URL"
			},
			class:{
				hidden: true,
				"default": "tv2article"
			},
			linktarget: {
				elem: "select",
				options: [ "Samme vindu", "Nytt vindu"],
				values: [ "_parent", "_blank"],
				label: "Lenke åpnes i",
				"default": "_blank"
			}
				/*,
				"target": {
					"hidden": false
				}*/
			}
    });
}(Popcorn));
