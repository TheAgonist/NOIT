(function () {
    'use strict';
    angular
        .module('app')
        .controller('Upload.IndexController', Controller);
    function Controller(UploadService) {
        initController();
        function initController(){
            $(function () {
                $('#fileupload').fileupload({
                    dataType: 'json',
                    add: function (e, data) {
                        data.context = $('<button/>').text('Upload')
                            .appendTo(document.body)
                            .click(function () {
                                data.context = $('<p/>').text('Uploading...').replaceAll($(this));
                                console.log(data.submit());
                                data.submit();
                            });
                    },
                    done: function (e, data) {
                        data.context.text('Upload finished.');
                    }
                });
            });
        }
        function submit(){
            console.log("dd");
        }
    }
})();