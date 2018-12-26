 (function () {

    ceddl.modelFactory.create({
        key: 'page',
        root: true,
        fields: {
            category: {
                type: ceddl.modelFactory.fields.StringField,
                required: true,
                choices: 'homepage|about'
            }
        }
    });

      ceddl.modelFactory.create({
        key: 'todoItem',
        root: false,
        fields: {
            state: {
                type: ceddl.modelFactory.fields.StringField,
                required: true,
                choices: 'active|completed'
            },
            content: {
                type: ceddl.modelFactory.fields.StringField,
                required: true,
            },
            contentLength: {
                type: ceddl.modelFactory.fields.NumberField,
                required: true,
            }
        }
    });

     ceddl.modelFactory.create({
        key: 'todoList',
        root: true,
        fields: {
            itemsTotal: {
                type: ceddl.modelFactory.fields.NumberField,
                required: true,
            },
            itemsLeft: {
                type: ceddl.modelFactory.fields.NumberField,
                required: true,
            },
            items: {
                type: ceddl.modelFactory.fields.ListField, // Note the ListField type here
                foreignModel: 'todoItem', // Reference to the key of the sub model
                required: false,
            },
            activeFilter: {
                type: ceddl.modelFactory.fields.StringField,
                required: true,
                choices: 'all|active|completed'
            }
        }
    });

    // Initialize not here but part of the app router.

}());

// Adding some code here to allow you to see data
// changes in the datalayer by listening to events
// on the eventbus
(function () {
    var jview = new JsonViewer(document.getElementById('json-container'));
    var rendering = false;
    function renderdataObject(){
        if (!rendering) {
            rendering = true;
            setTimeout(function(){
                var allData = ceddl.getModels();
                allData.events = ceddl.getEvents();
                jview.set(allData);
                rendering = false;
            }, 150);
        }
    }

    ceddl.eventbus.on('ceddl:models', function(data) {
        renderdataObject();
    });

    ceddl.eventbus.on('ceddl:events', function(data) {
        renderdataObject();
    });
}());
