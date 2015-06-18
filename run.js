$(document).ready(function() {

    // Custom Template Engines
    var onClickComment = function() {
        //console.log(this);
    };

    var onClickEdit = function() {
        console.log(this);
        $("input.comment").toggleClass("comment-edited");
        var inputAbove = this.previousSibling;

    };

    var Comment = JSONEditor.defaults.editors.string.extend({
        register: function() {
            this._super();
            if (!this.input) {
                return;
            }
            // base comment attributes, starts as editable
            this.input.onclick = onClickComment;
            this.input.className = "comment comment-base comment-enabled ";

            // each comment has an edit button placed right after it
            var editBtn = document.getElementById("edit-btn");
            var parentDiv = this.input.parentNode;
            // no insertAfter function so insert it before its sibling
            parentDiv.insertBefore (editBtn, this.input.nextSibling);
            editBtn.onclick = onClickEdit;
        }
    });

    JSONEditor.defaults.editors.comment = Comment;

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
                title: 'Car Discussion',
                items: {
                    type: 'comment'
                }
            }
        }
    };

    var options = {
        schema: schema,
        disable_properties: true,
        disable_array_reorder: true,
        disable_edit_json: true,
        theme: 'bootstrap3'
    };

    var editor = new JSONEditor(element, options);

    $('input[type="button"]').click(function() {

        $('.comment').prop('disabled', function(i,oldVal) { return !oldVal; });

    });
});
