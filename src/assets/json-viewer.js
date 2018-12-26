window.JsonViewer = function(Elm){

    'use strict';
    var myStyle = ".json-container-update:before,.json-container-wrap{font-size:12px;line-height:1.2;font-family:monospace}@-webkit-keyframes json-success{0%{opacity:1}50%{opacity:1;-webkit-transform:translateY(0)}100%{opacity:0;-webkit-transform:translateY(-10px)}}.json-container-wrap{position:relative;padding:0;border:1px solid #999;background:#fcf8e3;max-height:350px;overflow-y:auto}.json-container{padding-left:0;margin:10px}.json-container-update{position:relative}.json-container-update:before{position:absolute;right:20px;top:10px;font-weight:700;content:'updated';color:#4e9a06;animation:json-success 2s 0s;animation-fill-mode:forwards;z-index:1}.json-container,.json-container ul{list-style:none}.json-container ul{padding:0 0 0 20px;margin:0}.json-container li{position:relative}.json-container .array .key,.json-container>li>.jkey{display:none}.json-container .jarray .jobject .jkey{display:inline}.json-container li:after{content:','}.json-container li:last-child:after{content:''}.json-container .jnull{color:#999}.json-container .jstring{color:#4e9a06}.json-container .jnumber{color:#a40000}.json-container .jboolean{color:#c4a000}.json-container .jkey{color:#204a87}";
    var myElm = Elm;

    if(!document.getElementById('JsonViewerStyle')) {
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        s.setAttribute('id', 'JsonViewerStyle');
        if (s.styleSheet) {   // IE
            s.styleSheet.cssText = myStyle;
        } else {                // the world
            s.appendChild(document.createTextNode(myStyle));
        }
        head.appendChild(s);
    }

    function set(json) {
        myElm.parentElement.classList.remove('json-container-update');
        myElm.innerHTML = '<ul class="json-container">' + json2html([json]) + '</ul>';

        setTimeout(function() {
            myElm.parentElement.classList.add('json-container-update');
        }, 30);
    }

    function json2html(json) {
        var html = '';
        for (var key in json) {
            if (!json.hasOwnProperty(key)) {
                continue;
            }

            var value = json[key],
                type = typeof json[key];

            html = html + createJsonElement(key, value, type);
        }
        return html;
    }

    function createJsonElement(key, value, type) {
        var klass = 'jobject',
            open = '{',
            close = '}';

        if (Array.isArray(value)) {
            klass = 'jarray';
            open = '[';
            close = ']';
        }

        if (value === null) {
            return '<li><span class="jkey">"' + key + '": </span><span class="jnull">"' + value + '"</span></li>';
        }

        switch(type){
            case 'object':
                var object = '<li><span class="expanded"></span><span class="jkey">"' + key + '": </span> <span class="open">' + open + '</span> <ul class="' + klass + '">';
                object = object + json2html(value);
                return object + '</ul><span class="close">' + close + '</span></li>';
            case 'number':
            case 'boolean':
                return '<li><span class="jkey">"' + key + '": </span><span class="j'+ type + '">' + value + '</span></li>';
            default:
                return '<li><span class="jkey">"' + key + '": </span><span class="j'+ type + '">"' + value + '"</span></li>';
        }
    }

    return {
        set: set
    };

};
