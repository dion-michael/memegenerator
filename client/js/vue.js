let app = new Vue({
    el: "#app",
    data: {
        title: "hi there"
    },
    methods: {
        createGIF() {
            gifshot.createGIF(function (obj) {
                if (!obj.error) {
                    var image = obj.image,
                        animatedImage = document.createElement('img');
                    animatedImage.src = image;
                    document.body.appendChild(animatedImage);
                }
            });
        },
        gifFromVideo() {
            gifshot.createGIF({
                'video': ['example.mp4', 'example.ogv']
            }, function (obj) {
                if (!obj.error) {
                    var image = obj.image,
                        animatedImage = document.createElement('img');
                    animatedImage.src = image;
                    document.body.appendChild(animatedImage);
                }
            });
        },
        recognizeText() {
            // Imports the Google Cloud client library

        }
    },
    created() {
        this.recognizeText()
    }
})