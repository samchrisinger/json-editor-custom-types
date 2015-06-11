$(document).ready(function() {
    // Custom Template Engines
    var onClickComment = function() {
        console.log(this);
    };
    var Comment = JSONEditor.defaults.editors.string.extend({
        register: function() {
            this._super();
            if (!this.input) {
                return;
            }
            this.input.onclick = onClickComment;
        }
    });
    JSONEditor.defaults.editors.comment = Comment;
    /*
    JSONEditor.defaults.resolvers.unshift(function(schema) {
        if(schema.type === 'comment') {
            return "comment";
        }
    });
     */
    /////

    var element = document.getElementById('editor_holder');

    schema = {
        type: "object",
        title: "Car",
        properties: {
            make: {
                type: "string",
                'enum': [
                    "Toyota",
                    "BMW",
                    "Honda",
                    "Ford",
                    "Chevy",
                    "VW"
                ]
            },
            model: {
                type: "string"
            },
            year: {
                type: "integer",
                'enum': [
                    1995, 1996, 1997, 1998, 1999,
                    2000, 2001, 2002, 2003, 2004,
                    2005, 2006, 2007, 2008, 2009,
                    2010, 2011, 2012, 2013, 2014
                ],
                default: 2008
            },
            comments: {
                type: 'array',
                items: {
                    type: 'comment'
                }
            }
        }
    };

    var options = {
        schema: schema,
        disable_properties: true,
        disable_edit_json: true
    };

    var editor = new JSONEditor(element, options);
});
