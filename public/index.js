/* global Vue, VueRouter, axios, AmCharts, tracking, uchihaExample, $ */

var EMOTION_API_ID = "";
var EMOTION_API_KEY1 = "";
var sessionId = "";

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Uchiha! Please select a route."
    };
  },
  created: function() {},
  mounted: function() {},
  methods: {},
  computed: {}
};

var UserPage = {
  template: "#user-page",
  data: function() {
    return {
      message: "Welcome to Uchiha! Please edit your user settings.",
      errors: [],
      userInfo: {},
      filters: {
        name: "",
        anger: "",
        contempt: "",
        disgust: "",
        fear: "",
        happiness: "",
        neutral: "",
        sadness: "",
        surprise: ""
      },
      userFilters: [],
      password: "",
      passwordConfirmation: "",
      showModal: false,
      filterName: "",
      imageAnger: "", // we will store base64 format of image in this string
      imageContempt: "",
      imageDisgust: "",
      imageFear: "",
      imageHappiness: "",
      imageNeutral: "",
      imageSadness: "",
      imageSurprise: "",
      imgFilters: [
        { name: "alien", image: "img/filters/alien.png" },
        { name: "angry", image: "img/filters/angry.png" },
        { name: "anonymous", image: "img/filters/anonymous.png" },
        { name: "baby", image: "img/filters/baby.png" },
        { name: "barf", image: "img/filters/barf.png" },
        { name: "cartoonSanta", image: "img/filters/cartoon-santa.png" },
        {
          name: "cartoonSeeNoMonkey",
          image: "img/filters/cartoon-see-no-monkey.png"
        },
        { name: "clown", image: "img/filters/clown.png" },
        { name: "crying", image: "img/filters/crying.png" },
        { name: "fatAngry", image: "img/filters/fat-angry.png" },
        { name: "fatCrying", image: "img/filters/fat-crying.png" },
        { name: "fatHappy", image: "img/filters/fat-happy.png" },
        { name: "fire", image: "img/filters/fire.png" },
        { name: "frenchGhost", image: "img/filters/french-ghost.png" },
        { name: "goofyGhost", image: "img/filters/goofy-ghost.png" },
        { name: "japaneseGoblin", image: "img/filters/japanese-goblin.png" },
        { name: "koala", image: "img/filters/koala.png" },
        { name: "moneyBag", image: "img/filters/money-bag.png" },
        { name: "mufasa", image: "img/filters/mufasa.png" },
        { name: "panda", image: "img/filters/panda.png" },
        { name: "pirateSkull", image: "img/filters/pirate-skull.png" },
        { name: "poop", image: "img/filters/poop.png" },
        { name: "rocker", image: "img/filters/rocker.png" },
        { name: "sad", image: "img/filters/sad.png" },
        { name: "santa", image: "img/filters/santa.png" },
        { name: "seeNoMonkey", image: "img/filters/see-no-monkey.png" },
        { name: "shadesGhost", image: "img/filters/shades-ghost.png" },
        { name: "simba", image: "img/filters/simba.png" },
        { name: "speakNoMonkey", image: "img/filters/speak-no-monkey.png" },
        { name: "scream", image: "img/filters/scream.png" },
        { name: "greenBeaver", image: "img/filters/beavers/green-beaver.png" },
        { name: "sadBeaver", image: "img/filters/beavers/sad-beaver.png" },
        {
          name: "thinkingBeaver",
          image: "img/filters/beavers/thinking-beaver.png"
        },
        { name: "devilBeaver", image: "img/filters/beavers/devil-beaver.png" },
        {
          name: "cryingBeaver",
          image: "img/filters/beavers/crying-beaver.png"
        },
        {
          name: "laughingBeaver",
          image: "img/filters/beavers/laughing-beaver.png"
        },
        { name: "ogBeaver", image: "img/filters/beavers/og-beaver.png" },
        {
          name: "rainbowBeaver",
          image: "img/filters/beavers/rainbow-beaver.png"
        },
        {
          name: "thumbsDownBeaver",
          image: "img/filters/beavers/thumbs-down-beaver.png"
        },
        {
          name: "veryAngerBeaver",
          image: "img/filters/beavers/very-anger-beaver.png"
        },
        { name: "appBeaver", image: "img/filters/beavers/app-beaver.png" },
        { name: "nick1", image: "img/filters/celebrity/nick1.png" },
        { name: "nick2", image: "img/filters/celebrity/nick2.png" },
        { name: "nick3", image: "img/filters/celebrity/nick3.png" },
        { name: "kanye", image: "img/filters/celebrity/kanye.png" },
        { name: "putin", image: "img/filters/celebrity/putin.png" },
        {
          name: "ryan gosling",
          image: "img/filters/celebrity/ryan-gosling.png"
        },
        { name: "shaq", image: "img/filters/celebrity/shaq.png" },
        {
          name: "superbad evan",
          image: "img/filters/celebrity/superbad-evan.png"
        },
        { name: "trump", image: "img/filters/celebrity/trump.png" },
        { name: "vin diesel", image: "img/filters/celebrity/vin-diesel.png" }
      ]
    };
  },
  created: function() {
    axios.get("/v1/users?current_user=true").then(
      function(response) {
        this.userInfo = response.data;
      }.bind(this)
    );
    axios.get("/v1/filters?user_filters=true").then(
      function(response) {
        this.userFilters = response.data.userFilters;
      }.bind(this)
    );
  },
  mounted: function() {},
  methods: {
    userSettingSubmit: function() {
      var params = {
        user_name: this.userInfo.user_name,
        email: this.userInfo.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        full_name: this.userInfo.full_name,
        birth_date: this.userInfo.birth_date,
        gender: this.userInfo.gender
      };
      axios
        .patch("/v1/users/" + this.userInfo.id, params)
        .then(function(response) {
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    editUserFilters: function(userFilter) {
      if (this.imageAnger.length > 0) {
        this.filters.anger = this.imageAnger;
      } else {
        this.filters.anger = userFilter.anger;
      }
      if (this.imageContempt.length > 0) {
        this.filters.contempt = this.imageContempt;
      } else {
        this.filters.contempt = userFilter.contempt;
      }
      if (this.imageDisgust.length > 0) {
        this.filters.disgust = this.imageDisgust;
      } else {
        this.filters.disgust = userFilter.disgust;
      }
      if (this.imageFear.length > 0) {
        this.filters.fear = this.imageFear;
      } else {
        this.filters.fear = userFilter.fear;
      }
      if (this.imageHappiness.length > 0) {
        this.filters.happiness = this.imageHappiness;
      } else {
        this.filters.happiness = userFilter.happiness;
      }
      if (this.imageNeutral.length > 0) {
        this.filters.neutral = this.imageNeutral;
      } else {
        this.filters.neutral = userFilter.neutral;
      }
      if (this.imageSadness.length > 0) {
        this.filters.sadness = this.imageSadness;
      } else {
        this.filters.sadness = userFilter.sadness;
      }
      if (this.imageSurprise.length > 0) {
        this.filters = this.imageSurprise;
      } else {
        this.filters.surprise = userFilter.surprise;
      }
      if (this.filterName) {
        this.filters.name = this.filterName;
      } else {
        this.filters.name = userFilter.name;
      }
      axios
        .patch("/v1/filters/" + userFilter.id, {
          anger: this.filters.anger,
          contempt: this.filters.contempt,
          disgust: this.filters.disgust,
          fear: this.filters.fear,
          happiness: this.filters.happiness,
          neutral: this.filters.neutral,
          sadness: this.filters.sadness,
          surprise: this.filters.surprise,
          name: this.filters.name
        })
        .then(function(response) {
          router.push("/user");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    previewAnger: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageAnger = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      } else {
        console.log("hello", this.imageAnger);
      }
    },
    previewContempt: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageContempt = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewDisgust: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageDisgust = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewFear: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageFear = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewHappiness: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageHappiness = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewNeutral: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageNeutral = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewSadness: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.imageSadness = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewSurprise: function(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageSurprise = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
        // Toggle modal after filter uploaded
        $("#surpriseModal").modal("toggle");
      }
    },
    uploadFilters: function(event) {
      if (
        this.imageAnger.length > 0 &&
        this.imageContempt.length > 0 &&
        this.imageDisgust.length > 0 &&
        this.imageFear.length > 0 &&
        this.imageHappiness.length > 0 &&
        this.imageNeutral.length > 0 &&
        this.imageSadness.length > 0 &&
        this.imageSurprise.length > 0
      ) {
        axios
          .post("/v1/filters", {
            anger: this.imageAnger,
            contempt: this.imageContempt,
            disgust: this.imageDisgust,
            fear: this.imageFear,
            happiness: this.imageHappiness,
            neutral: this.imageNeutral,
            sadness: this.imageSadness,
            surprise: this.imageSurprise,
            name: this.filterName
          })
          .then(function(response) {
            console.log(response);
            this.filterName = "";
            this.Anger = "";
            this.Contempt = "";
            this.Disgust = "";
            this.Fear = "";
            this.Happiness = "";
            this.Neutral = "";
            this.Sadness = "";
            this.Surprise = "";
          });
      }
    }
  },
  computed: {}
};

var VisualProwessPage = {
  template: "#visualProwess-page",
  data: function() {
    return {
      currentStatsEmotionsId: 0,
      currentStatsEmotions: [],
      statsEmotionsId: 0,
      statsEmotions: [],
      emotions: [],
      result: [
        {
          scores: {
            anger: 0,
            contempt: 0,
            disgust: 0,
            fear: 0,
            happiness: 0,
            neutral: 0,
            sadness: 0,
            surprise: 0
          }
        }
      ],
      activeFilter: "img/filters/beavers/green-beaver.png",
      filters: {
        anger: "img/filters/fat-angry.png",
        contempt: "img/filters/panda.png",
        disgust: "img/filters/barf.png",
        fear: "img/filters/see-no-monkey.png",
        happiness: "img/filters/simba.png",
        neutral: "img/filters/koala.png",
        sadness: "img/filters/fat-crying.png",
        surprise: "img/filters/japanese-goblin.png"
      },
      imgFilters: {},
      intervalId: null,
      showCurrentEmotions: true
    };
  },
  watch: {
    emotions: function(emotion) {
      var highestEmotion = Object.keys(this.emotions).reduce(
        (a, b) => (this.emotions[a] > this.emotions[b] ? a : b)
      );
      this.activeFilter = this.filters[`${highestEmotion}`];
      var emotionChart = AmCharts.makeChart("emotion-chartdiv", {
        theme: "black",
        type: "serial",
        startDuration: 0,
        dataProvider: [
          {
            emotion: "Anger",
            score: emotion.anger,
            color: "#FF0F00"
          },
          {
            emotion: "Contempt",
            score: emotion.contempt,
            color: "#FF6600"
          },
          {
            emotion: "Disgust",
            score: emotion.disgust,
            color: "#FF9E01"
          },
          {
            emotion: "Fear",
            score: emotion.fear,
            color: "#FCD202"
          },
          {
            emotion: "Happiness",
            score: emotion.happiness,
            color: "#F8FF01"
          },
          {
            emotion: "Neutral",
            score: emotion.neutral,
            color: "#B0DE09"
          },
          {
            emotion: "Sadness",
            score: emotion.sadness,
            color: "#04D215"
          },
          {
            emotion: "Surprise",
            score: emotion.surprise,
            color: "#0D8ECF"
          }
        ],
        valueAxes: [
          {
            position: "left",
            title: "Emotion"
          }
        ],
        graphs: [
          {
            balloonText: "[[category]]: <b>[[value]]</b>",
            fillColorsField: "color",
            fillAlphas: 1,
            lineAlpha: 0.1,
            type: "column",
            valueField: "score"
          }
        ],
        depth3D: 20,
        angle: 30,
        chartCursor: {
          categoryBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: "emotion",
        categoryAxis: {
          gridPosition: "start",
          labelRotation: 90
        }
      });
    },
    statsEmotions: function(statsEmotion) {
      var statsEmotionChart = AmCharts.makeChart("overall-stats-chartdiv", {
        type: "serial",
        theme: "black",
        legend: {
          useGraphSettings: true
        },
        dataProvider: this.statsEmotions,
        valueAxes: [
          {
            integersOnly: false,
            maximum: 100,
            minimum: 0,
            reversed: false,
            axisAlpha: 0,
            dashLength: 5,
            gridCount: 10,
            position: "left",
            title: "Emotions taken"
          }
        ],
        startDuration: 0,
        graphs: [
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            hidden: false,
            title: "Anger",
            valueField: "anger",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Contempt",
            valueField: "contempt",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Disgust",
            valueField: "disgust",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Fear",
            valueField: "fear",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Happiness",
            valueField: "happiness",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Neutral",
            valueField: "neutral",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Sadness",
            valueField: "sadness",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Surprise",
            valueField: "surprise",
            fillAlphas: 0
          }
        ],
        chartCursor: {
          cursorAlpha: 0,
          zoomable: true
        },
        categoryField: "id",
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0,
          fillAlpha: 0.05,
          fillColor: "#000000",
          gridAlpha: 0,
          position: "top"
        },
        gridAlpha: 0,
        position: "top"
      });
      var currentStatsEmotionChart = AmCharts.makeChart(
        "current-stats-chartdiv",
        {
          type: "serial",
          theme: "black",
          legend: {
            useGraphSettings: true
          },
          dataProvider: this.currentStatsEmotions,
          valueAxes: [
            {
              integersOnly: false,
              maximum: 100,
              minimum: 0,
              reversed: false,
              axisAlpha: 0,
              dashLength: 5,
              gridCount: 10,
              position: "left",
              title: "Emotions taken"
            }
          ],
          startDuration: 0,
          graphs: [
            {
              balloonText: "[[title]]: [[value]]",
              bullet: "round",
              hidden: false,
              title: "Anger",
              valueField: "anger",
              fillAlphas: 0
            },
            {
              balloonText: "[[title]]: [[value]]",
              bullet: "round",
              title: "Contempt",
              valueField: "contempt",
              fillAlphas: 0
            },
            {
              balloonText: "[[title]]: [[value]]",
              bullet: "round",
              title: "Disgust",
              valueField: "disgust",
              fillAlphas: 0
            },
            {
              balloonText: "[[title]]: [[value]]",
              bullet: "round",
              title: "Fear",
              valueField: "fear",
              fillAlphas: 0
            },
            {
              balloonText: "[[title]]: [[value]]",
              bullet: "round",
              title: "Happiness",
              valueField: "happiness",
              fillAlphas: 0
            },
            {
              balloonText: "[[title]]: [[value]]",
              bullet: "round",
              title: "Neutral",
              valueField: "neutral",
              fillAlphas: 0
            },
            {
              balloonText: "[[title]]: [[value]]",
              bullet: "round",
              title: "Sadness",
              valueField: "sadness",
              fillAlphas: 0
            },
            {
              balloonText: "[[title]]: [[value]]",
              bullet: "round",
              title: "Surprise",
              valueField: "surprise",
              fillAlphas: 0
            }
          ],
          chartCursor: {
            cursorAlpha: 0,
            zoomable: true
          },
          categoryField: "id",
          categoryAxis: {
            gridPosition: "start",
            axisAlpha: 0,
            fillAlpha: 0.05,
            fillColor: "#000000",
            gridAlpha: 0,
            position: "top"
          },
          gridAlpha: 0,
          position: "top"
        }
      );
    }
  },
  created: function() {
    axios.get("/v1/visual_prowesses").then(
      function(response) {
        this.statsEmotions = response.data;
      }.bind(this)
    );
    axios.get("/v1/filters?user_filters=true").then(
      function(response) {
        this.imgFilters = response.data;
      }.bind(this)
    );
  },
  mounted: function() {
    var vm = this;
    var myWorker = new Worker("js/tracking-worker.js");

    var initTracker = function(argument) {
      var width = 1080; // We will scale the photo width to this
      var height = 0;
      var streaming = false;
      var video = document.getElementById("video");
      var canvas = document.getElementById("tracker");
      var frame = document.getElementById("frame");
      var img = document.createElement("img");
      var visualProwessButton = document.getElementById("visualProwessButton");
      var visualFilterButton = document.getElementById("visualFilterButton");
      var context = canvas.getContext("2d");

      video.addEventListener(
        "canplay",
        function(ev) {
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
            frame.setAttribute("width", width);
            frame.setAttribute("height", height);
            streaming = true;
          }
        },
        false
      );

      var tracker = new tracking.ObjectTracker("face");
      tracker.setInitialScale(3.25);
      tracker.setStepSize(1.68);
      tracker.setEdgesDensity(0.1);
      tracking.track("#video", tracker, { camera: true });

      visualProwessButton.addEventListener(
        "click",
        function(ev) {
          window.statsTrackerEnabled = !window.statsTrackerEnabled;
          if (window.statsTrackerEnabled) {
            axios.get("/keys").then(function(response) {
              EMOTION_API_ID = response.data.id;
              EMOTION_API_KEY1 = response.data.key;
              sessionId = response.data.session_id;
            });
            vm.intervalId = setInterval(function() {
              takepicture();
              ev.preventDefault();
            }, 5000);
          } else {
            clearInterval(vm.intervalId);
            context.clearRect(0, 0, canvas.width, canvas.height);
          }
        }.bind(this),
        false
      );
      visualFilterButton.addEventListener(
        "click",
        function(ev) {
          window.filterTrackerEnabled = !window.filterTrackerEnabled;
          if (window.filterTrackerEnabled) {
            axios.get("/keys").then(function(response) {
              EMOTION_API_ID = response.data.id;
              EMOTION_API_KEY1 = response.data.key;
              sessionId = response.data.session_id;
            });
            vm.intervalId = setInterval(function() {
              img.src = vm.activeFilter;
              takepicture();
              ev.preventDefault();
            }, 5000);
          } else {
            clearInterval(vm.intervalId);
            context.clearRect(0, 0, canvas.width, canvas.height);
          }
        }.bind(this),
        false
      );

      myWorker.onmessage = function(event) {
        tracker.emit("track", event);
      };
      tracker.on("track", function(event) {
        if (window.statsTrackerEnabled) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          event.data.forEach(function(rect) {
            context.strokeStyle = "#fffa00";
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = "18px Helvetica";
            context.fillStyle = "#fffa00";
            context.fillText(
              "anger: " + (vm.result[0].scores.anger * 100).toFixed(3) + "%",
              rect.x + rect.width + 5,
              rect.y
            );
            context.fillText(
              "contempt: " +
                (vm.result[0].scores.contempt * 100).toFixed(3) +
                "%",
              rect.x + rect.width + 5,
              rect.y + 18
            );
            context.fillText(
              "disgust: " +
                (vm.result[0].scores.disgust * 100).toFixed(3) +
                "%",
              rect.x + rect.width + 5,
              rect.y + 36
            );
            context.fillText(
              "fear: " + (vm.result[0].scores.fear * 100).toFixed(3) + "%",
              rect.x + rect.width + 5,
              rect.y + 54
            );
            context.fillText(
              "happiness: " +
                (vm.result[0].scores.happiness * 100).toFixed(3) +
                "%",
              rect.x + rect.width + 5,
              rect.y + 72
            );
            context.fillText(
              "neutral: " +
                (vm.result[0].scores.neutral * 100).toFixed(3) +
                "%",
              rect.x + rect.width + 5,
              rect.y + 90
            );
            context.fillText(
              "sadness " + (vm.result[0].scores.sadness * 100).toFixed(3) + "%",
              rect.x + rect.width + 5,
              rect.y + 108
            );
            context.fillText(
              "surprise: " +
                (vm.result[0].scores.surprise * 100).toFixed(3) +
                "%",
              rect.x + rect.width + 5,
              rect.y + 126
            );
          });
        } else if (window.filterTrackerEnabled) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          event.data.forEach(function(rect) {
            context.drawImage(
              img,
              rect.x,
              rect.y / 1.5,
              rect.width + 11,
              rect.height * 1.9
            );
          });
        } else {
          return;
        }
      });

      function takepicture() {
        var context = frame.getContext("2d");
        if (width && height) {
          frame.width = width;
          frame.height = height;
          context.drawImage(video, 0, 0, width, height);

          var dataURL = frame.toDataURL("image/png");
          var makeblob = function(dataURL) {
            var BASE64_MARKER = ";base64,";
            if (dataURL.indexOf(BASE64_MARKER) === -1) {
              var parts = dataURL.split(",");
              var contentType = parts[0].split(":")[1];
              var raw = decodeURIComponent(parts[1]);
              return new Blob([raw], { type: contentType });
            }
            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(":")[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
              uInt8Array[i] = raw.charCodeAt(i);
            }

            return new Blob([uInt8Array], { type: contentType });
          };

          var a1 = $.ajax({
              url: EMOTION_API_ID,
              beforeSend: function(xhrObj) {
                xhrObj.setRequestHeader(
                  "Content-Type",
                  "application/octet-stream"
                );
                xhrObj.setRequestHeader(
                  "Ocp-Apim-Subscription-Key",
                  EMOTION_API_KEY1
                );
              },
              type: "POST",
              data: makeblob(dataURL),
              processData: false,
              success: function(data) {
                if (vm.currentStatsEmotions.length > 0) {
                  vm.currentStatsEmotionsId =
                    vm.currentStatsEmotions[
                      vm.currentStatsEmotions.length - 1
                    ].id;
                } else {
                  vm.currentStatsEmotionsId = 0;
                }
                if (vm.statsEmotions.length > 0) {
                  vm.statsEmotionsId =
                    vm.statsEmotions[vm.statsEmotions.length - 1].id;
                } else {
                  vm.statsEmotionsId = 0;
                }
                vm.result = data;
                vm.currentStatsEmotions.push({
                  id: vm.currentStatsEmotionsId + 1,
                  anger: (vm.result[0].scores.anger * 100).toFixed(4),
                  contempt: (vm.result[0].scores.contempt * 100).toFixed(4),
                  disgust: (vm.result[0].scores.disgust * 100).toFixed(4),
                  fear: (vm.result[0].scores.fear * 100).toFixed(4),
                  happiness: (vm.result[0].scores.happiness * 100).toFixed(4),
                  neutral: (vm.result[0].scores.neutral * 100).toFixed(4),
                  sadness: (vm.result[0].scores.sadness * 100).toFixed(4),
                  surprise: (vm.result[0].scores.surprise * 100).toFixed(4)
                });
                vm.emotions = vm.result[0].scores;
                vm.statsEmotions.push({
                  id: vm.statsEmotionsId + 1,
                  anger: (vm.result[0].scores.anger * 100).toFixed(4),
                  contempt: (vm.result[0].scores.contempt * 100).toFixed(4),
                  disgust: (vm.result[0].scores.disgust * 100).toFixed(4),
                  fear: (vm.result[0].scores.fear * 100).toFixed(4),
                  happiness: (vm.result[0].scores.happiness * 100).toFixed(4),
                  neutral: (vm.result[0].scores.neutral * 100).toFixed(4),
                  sadness: (vm.result[0].scores.sadness * 100).toFixed(4),
                  surprise: (vm.result[0].scores.surprise * 100).toFixed(4)
                });
              }
            }).fail(function(data) {
              alert(
                "Code: " +
                  data.responseJSON.error.code +
                  " Message:" +
                  data.responseJSON.error.message
              );
            }),
            a2 = a1.then(function(result) {
              axios
                .post("/v1/visual_prowesses", {
                  anger: vm.result[0].scores.anger,
                  contempt: vm.result[0].scores.contempt,
                  disgust: vm.result[0].scores.disgust,
                  fear: vm.result[0].scores.fear,
                  happiness: vm.result[0].scores.happiness,
                  neutral: vm.result[0].scores.neutral,
                  sadness: vm.result[0].scores.sadness,
                  surprise: vm.result[0].scores.surprise,
                  image: dataURL,
                  leftPx: vm.result[0].faceRectangle.left,
                  topPx: vm.result[0].faceRectangle.top,
                  widthPx: vm.result[0].faceRectangle.width,
                  heightPx: vm.result[0].faceRectangle.height,
                  session: sessionId + 1
                })
                .then(function(response) {
                  console.log("response from server", response);
                })
                .catch(function(response) {
                  console.log("error", response);
                });
            });
        }
      }
    };
    initTracker();
  },
  methods: {
    showPublicFilter: function(publicFilter) {
      this.filters.anger = publicFilter.anger;
      this.filters.contempt = publicFilter.contempt;
      this.filters.disgust = publicFilter.disgust;
      this.filters.fear = publicFilter.fear;
      this.filters.happiness = publicFilter.happiness;
      this.filters.neutral = publicFilter.neutral;
      this.filters.sadness = publicFilter.sadness;
      this.filters.surprise = publicFilter.surprise;
    },
    showUserFilter: function(userFilter) {
      this.filters.anger = userFilter.anger;
      this.filters.contempt = userFilter.contempt;
      this.filters.disgust = userFilter.disgust;
      this.filters.fear = userFilter.fear;
      this.filters.happiness = userFilter.happiness;
      this.filters.neutral = userFilter.neutral;
      this.filters.sadness = userFilter.sadness;
      this.filters.surprise = userFilter.surprise;
    },
    showOverallEmotion: function() {
      this.showCurrentEmotions = false;
      return this.showCurrentEmotions;
    },
    showCurrentEmotion: function() {
      this.showCurrentEmotions = true;
      return this.showCurrentEmotions;
    },
    visualProwess: function() {
      // console.log("This from visual method", this);
    },
    visualFilter: function() {
      // console.log("This from visualFilter method", this);
    }
  },
  computed: {}
};

var SharinganPage = {
  template: "#sharingan-page",
  data: function() {
    return {
      statsEmotions: [],
      emotions: [],
      result: [
        {
          scores: {
            anger: 0,
            contempt: 0,
            disgust: 0,
            fear: 0,
            happiness: 0,
            neutral: 0,
            sadness: 0,
            surprise: 0
          }
        }
      ],
      intervalId: null
    };
  },
  watch: {
    emotions: function(emotion) {
      var chart = AmCharts.makeChart("emotion-chartdiv", {
        theme: "black",
        type: "serial",
        startDuration: 0,
        dataProvider: [
          {
            emotion: "Anger",
            score: emotion.anger,
            color: "#FF0F00"
          },
          {
            emotion: "Contempt",
            score: emotion.contempt,
            color: "#FF6600"
          },
          {
            emotion: "Disgust",
            score: emotion.disgust,
            color: "#FF9E01"
          },
          {
            emotion: "Fear",
            score: emotion.fear,
            color: "#FCD202"
          },
          {
            emotion: "Happiness",
            score: emotion.happiness,
            color: "#F8FF01"
          },
          {
            emotion: "Neutral",
            score: emotion.neutral,
            color: "#B0DE09"
          },
          {
            emotion: "Sadness",
            score: emotion.sadness,
            color: "#04D215"
          },
          {
            emotion: "Surprise",
            score: emotion.surprise,
            color: "#0D8ECF"
          }
        ],
        valueAxes: [
          {
            position: "left",
            title: "Emotion"
          }
        ],
        graphs: [
          {
            balloonText: "[[category]]: <b>[[value]]</b>",
            fillColorsField: "color",
            fillAlphas: 1,
            lineAlpha: 0.1,
            type: "column",
            valueField: "score"
          }
        ],
        depth3D: 20,
        angle: 30,
        chartCursor: {
          categoryBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: "emotion",
        categoryAxis: {
          gridPosition: "start",
          labelRotation: 90
        }
      });
    },
    statsEmotions: function(statsEmotion) {
      var chart = AmCharts.makeChart("sharingan-chartdiv", {
        type: "serial",
        theme: "black",
        legend: {
          useGraphSettings: true
        },
        dataProvider: this.statsEmotions,
        valueAxes: [
          {
            integersOnly: false,
            maximum: 100,
            minimum: 0,
            reversed: false,
            axisAlpha: 0,
            dashLength: 5,
            gridCount: 10,
            position: "left",
            title: "Emotions taken"
          }
        ],
        startDuration: 0,
        graphs: [
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            hidden: false,
            title: "Anger",
            valueField: "anger",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Contempt",
            valueField: "contempt",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Disgust",
            valueField: "disgust",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Fear",
            valueField: "fear",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Happiness",
            valueField: "happiness",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Neutral",
            valueField: "neutral",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Sadness",
            valueField: "sadness",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Surprise",
            valueField: "surprise",
            fillAlphas: 0
          }
        ],
        chartCursor: {
          cursorAlpha: 0,
          zoomable: true
        },
        categoryField: "id",
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0,
          fillAlpha: 0.05,
          fillColor: "#000000",
          gridAlpha: 0,
          position: "top"
        },
        gridAlpha: 0,
        position: "top"
      });
      console.log(chart);
    }
  },
  created: function() {
    axios.get("/v1/visual_prowesses").then(
      function(response) {
        this.statsEmotions = response.data;
      }.bind(this)
    );
  },
  mounted: function() {
    var vm = this;
    (function() {
      // |streaming| indicates whether or not we're currently streaming
      // video from the camera. Obviously, we start at false.
      var streaming = false;

      // detect WebAssembly support and load either WASM or ASM version of Uchiha
      var support = typeof WebAssembly === "object";

      if (!support) {
        uchihaBaseURL = "js/libs/asmjs/";
      }

      console.log(
        "Checking support of WebAssembly: " +
          support +
          " " +
          (support ? "loading WASM (not ASM)." : "loading ASM (not WASM).")
      );

      var script = document.createElement("script");

      script.setAttribute("type", "text/javascript");
      script.setAttribute("async", true);
      script.setAttribute("src", uchihaBaseURL + "Uchiha_JS_trial.js");

      document.getElementsByTagName("head")[0].appendChild(script);

      function initExample() {
        var webcam = document.getElementById("_webcam"); // our webcam video
        var imageData = document.getElementById("_imageData"); // image data for Uchiha
        var canvas = document.getElementById("canvas");
        var photo = document.getElementById("photo");
        var sharinganButton = document.getElementById("sharinganButton");
        var faces;
        var imageDataCtx = null;
        var width = 320;
        var height = 0;
        var uchiha = null;
        var uchiManager = null;
        var resolution = null;
        var ua = window.navigator.userAgent;
        var isIOS11 =
          (ua.indexOf("iPad") > 0 || ua.indexOf("iPhone") > 0) &&
          ua.indexOf("OS 11_") > 0;

        var stats = uchihaExample.stats;

        startCamera();

        function startCamera() {
          console.log("startCamera");

          // Start video playback once the camera was fetched.
          function onStreamFetched(mediaStream) {
            console.log("onStreamFetched");

            webcam.srcObject = mediaStream;
            webcam.play();

            // Check whether we know the video dimensions yet, if so, start Uchiha.
            function onStreamDimensionsAvailable() {
              console.log("onStreamDimensionsAvailable");

              if (webcam.videoWidth === 0) {
                setTimeout(onStreamDimensionsAvailable, 100);
              } else {
                // Resize the canvas to match the webcam video size.
                imageData.width = webcam.videoWidth;
                imageData.height = webcam.videoHeight;
                imageDataCtx = imageData.getContext("2d");

                // Resize the grabFrame to match the webcam video size.
                canvas.width = webcam.videoWidth;
                canvas.height = webcam.videoHeight;

                // onResize();
                // window.addEventListener("resize", onResize);

                // on iOS we want to close the video stream first and
                // wait for the heavy Uchiha initialization to finish.
                // Once that is done, we start the stream again.

                if (isIOS11) {
                  webcam.pause();
                  webcam.srcObject.getTracks().forEach(function(track) {
                    track.stop();
                  });
                }

                waitForSDK();
              }
            }

            if (imageDataCtx === null) {
              onStreamDimensionsAvailable();
            } else {
              trackFaces();
            }
          }

          window.navigator.mediaDevices
            .getUserMedia({ video: { width: 640, height: 480, frameRate: 30 } })
            .then(onStreamFetched)
            .catch(function() {
              alert("No camera available.");
            });

          webcam.addEventListener(
            "canplay",
            function(ev) {
              if (!streaming) {
                height = webcam.videoHeight / (webcam.videoWidth / width);
                streaming = true;
              }
            },
            false
          );

          sharinganButton.addEventListener(
            "click",
            function(ev) {
              window.statsTrackerEnabled = !window.statsTrackerEnabled;
              if (window.statsTrackerEnabled) {
                axios.get("/keys").then(function(response) {
                  EMOTION_API_ID = response.data.id;
                  EMOTION_API_KEY1 = response.data.key;
                  sessionId = response.data.session_id;
                });
                vm.intervalId = setInterval(function() {
                  takepicture();
                  ev.preventDefault();
                }, 5000);
              } else {
                clearInterval(vm.intervalId);
              }
            }.bind(this),
            false
          );
        }

        function waitForSDK() {
          if (uchiha === null) {
            uchiha = {
              locateFile: function(fileName) {
                return uchihaBaseURL + fileName;
              }
            };
            initializeBRF(uchiha);
          }

          if (uchiha.sdkReady) {
            initSDK();
          } else {
            setTimeout(waitForSDK, 100);
          }
        }

        function initSDK() {
          resolution = new uchiha.Rectangle(
            0,
            0,
            imageData.width,
            imageData.height
          );
          uchiManager = new uchiha.BRFManager();
          uchiManager.init(
            resolution,
            resolution,
            "com.tastenkunst.uchiha.js.examples.minimal.webcam"
          );

          if (isIOS11) {
            // Start the camera stream again on iOS.
            setTimeout(function() {
              console.log("delayed camera restart for iOS 11");
              startCamera();
            }, 2000);
          } else {
            trackFaces();
          }
        }

        function trackFaces() {
          if (stats.start) stats.start();

          imageDataCtx.setTransform(-1.0, 0, 0, 1, resolution.width, 0); // mirrored for draw of video
          imageDataCtx.drawImage(
            webcam,
            0,
            0,
            resolution.width,
            resolution.height
          );
          imageDataCtx.setTransform(1.0, 0, 0, 1, 0, 0); // unmirrored for draw of results

          uchiManager.update(
            imageDataCtx.getImageData(0, 0, resolution.width, resolution.height)
              .data
          );

          faces = uchiManager.getFaces();

          for (var i = 0; i < faces.length; i++) {
            var face = faces[i];

            if (
              face.state === uchiha.BRFState.FACE_TRACKING_START ||
              face.state === uchiha.BRFState.FACE_TRACKING
            ) {
              imageDataCtx.strokeStyle = "#00a0ff";

              for (var k = 0; k < face.vertices.length; k += 2) {
                imageDataCtx.beginPath();
                imageDataCtx.arc(
                  face.vertices[k],
                  face.vertices[k + 1],
                  2,
                  0,
                  2 * Math.PI
                );
                imageDataCtx.stroke();
              }
            }
          }

          if (stats.end) stats.end();

          requestAnimationFrame(trackFaces);
        }

        function onResize() {
          var imageData = document.getElementById("_imageData"); // image data for Uchiha

          var ww = window.innerWidth;
          var wh = window.innerHeight;

          var s = wh / imageData.height;

          if (imageData.width * s < ww) {
            s = ww / imageData.width;
          }

          var iw = imageData.width * s;
          var ih = imageData.height * s;
          var ix = (ww - iw) * 0.5;
          var iy = (wh - ih) * 0.5;

          imageData.style.transformOrigin = "0% 0%";
          imageData.style.transform =
            "matrix(" + s + ", 0, 0, " + s + ", " + ix + ", " + iy + ")";
        }

        function takepicture() {
          var context = canvas.getContext("2d");
          if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(webcam, 0, 0, width, height);

            var dataURL = canvas.toDataURL("image/png");
            var makeblob = function(dataURL) {
              var BASE64_MARKER = ";base64,";
              if (dataURL.indexOf(BASE64_MARKER) === -1) {
                var parts = dataURL.split(",");
                var contentType = parts[0].split(":")[1];
                var raw = decodeURIComponent(parts[1]);
                return new Blob([raw], { type: contentType });
              }
              var parts = dataURL.split(BASE64_MARKER);
              var contentType = parts[0].split(":")[1];
              var raw = window.atob(parts[1]);
              var rawLength = raw.length;

              var uInt8Array = new Uint8Array(rawLength);

              for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
              }

              return new Blob([uInt8Array], { type: contentType });
            };

            var a1 = $.ajax({
                url: EMOTION_API_ID,
                beforeSend: function(xhrObj) {
                  xhrObj.setRequestHeader(
                    "Content-Type",
                    "application/octet-stream"
                  );
                  xhrObj.setRequestHeader(
                    "Ocp-Apim-Subscription-Key",
                    EMOTION_API_KEY1
                  );
                },
                type: "POST",
                data: makeblob(dataURL),
                processData: false,
                success: function(data) {
                  vm.result = data;
                  vm.emotions = vm.result[0].scores;
                  vm.statsEmotions.push({
                    // id: vm.statsEmotions[vm.statsEmotions.length - 1].id,
                    anger: (vm.result[0].scores.anger * 100).toFixed(4),
                    contempt: (vm.result[0].scores.contempt * 100).toFixed(4),
                    disgust: (vm.result[0].scores.disgust * 100).toFixed(4),
                    fear: (vm.result[0].scores.fear * 100).toFixed(4),
                    happiness: (vm.result[0].scores.happiness * 100).toFixed(4),
                    neutral: (vm.result[0].scores.neutral * 100).toFixed(4),
                    sadness: (vm.result[0].scores.sadness * 100).toFixed(4),
                    surprise: (vm.result[0].scores.surprise * 100).toFixed(4)
                  });
                }
              }).fail(function(data) {
                alert(
                  "Code: " +
                    data.responseJSON.error.code +
                    " Message:" +
                    data.responseJSON.error.message
                );
              }),
              a2 = a1.then(function(result) {
                // .then() returns a new promise
                axios
                  .post("/v1/visual_prowesses", {
                    right_0: `${faces[0].vertices[0]}, ${faces[0].vertices[1]}`,
                    right_1: `${faces[0].vertices[2]}, ${faces[0].vertices[3]}`,
                    right_2: `${faces[0].vertices[4]}, ${faces[0].vertices[5]}`,
                    right_3: `${faces[0].vertices[6]}, ${faces[0].vertices[7]}`,
                    right_4: `${faces[0].vertices[8]}, ${faces[0].vertices[9]}`,
                    right_5: `${faces[0].vertices[10]}, ${
                      faces[0].vertices[11]
                    }`,
                    right_6: `${faces[0].vertices[12]}, ${
                      faces[0].vertices[13]
                    }`,
                    right_7: `${faces[0].vertices[14]}, ${
                      faces[0].vertices[15]
                    }`,
                    middle_8: `${faces[0].vertices[16]}, ${
                      faces[0].vertices[17]
                    }`,
                    left_9: `${faces[0].vertices[18]}, ${
                      faces[0].vertices[19]
                    }`,
                    left_10: `${faces[0].vertices[20]}, ${
                      faces[0].vertices[21]
                    }`,
                    left_11: `${faces[0].vertices[22]}, ${
                      faces[0].vertices[23]
                    }`,
                    left_12: `${faces[0].vertices[24]}, ${
                      faces[0].vertices[25]
                    }`,
                    left_13: `${faces[0].vertices[26]}, ${
                      faces[0].vertices[27]
                    }`,
                    left_14: `${faces[0].vertices[28]}, ${
                      faces[0].vertices[29]
                    }`,
                    left_15: `${faces[0].vertices[30]}, ${
                      faces[0].vertices[31]
                    }`,
                    left_16: `${faces[0].vertices[32]}, ${
                      faces[0].vertices[33]
                    }`,
                    right_17: `${faces[0].vertices[34]}, ${
                      faces[0].vertices[35]
                    }`,
                    right_18: `${faces[0].vertices[36]}, ${
                      faces[0].vertices[37]
                    }`,
                    right_19: `${faces[0].vertices[38]}, ${
                      faces[0].vertices[39]
                    }`,
                    right_20: `${faces[0].vertices[40]}, ${
                      faces[0].vertices[41]
                    }`,
                    right_21: `${faces[0].vertices[42]}, ${
                      faces[0].vertices[43]
                    }`,
                    left_22: `${faces[0].vertices[44]}, ${
                      faces[0].vertices[45]
                    }`,
                    left_23: `${faces[0].vertices[46]}, ${
                      faces[0].vertices[47]
                    }`,
                    left_24: `${faces[0].vertices[48]}, ${
                      faces[0].vertices[49]
                    }`,
                    left_25: `${faces[0].vertices[50]}, ${
                      faces[0].vertices[51]
                    }`,
                    left_26: `${faces[0].vertices[52]}, ${
                      faces[0].vertices[53]
                    }`,
                    middle_27: `${faces[0].vertices[54]}, ${
                      faces[0].vertices[55]
                    }`,
                    middle_28: `${faces[0].vertices[56]}, ${
                      faces[0].vertices[57]
                    }`,
                    middle_29: `${faces[0].vertices[58]}, ${
                      faces[0].vertices[59]
                    }`,
                    middle_30: `${faces[0].vertices[60]}, ${
                      faces[0].vertices[61]
                    }`,
                    middle_31: `${faces[0].vertices[62]}, ${
                      faces[0].vertices[63]
                    }`,
                    middle_32: `${faces[0].vertices[64]}, ${
                      faces[0].vertices[65]
                    }`,
                    middle_33: `${faces[0].vertices[66]}, ${
                      faces[0].vertices[67]
                    }`,
                    middle_34: `${faces[0].vertices[68]}, ${
                      faces[0].vertices[69]
                    }`,
                    middle_35: `${faces[0].vertices[70]}, ${
                      faces[0].vertices[71]
                    }`,
                    right_36: `${faces[0].vertices[72]}, ${
                      faces[0].vertices[73]
                    }`,
                    right_37: `${faces[0].vertices[74]}, ${
                      faces[0].vertices[75]
                    }`,
                    right_38: `${faces[0].vertices[76]}, ${
                      faces[0].vertices[77]
                    }`,
                    right_39: `${faces[0].vertices[78]}, ${
                      faces[0].vertices[79]
                    }`,
                    right_40: `${faces[0].vertices[80]}, ${
                      faces[0].vertices[81]
                    }`,
                    right_41: `${faces[0].vertices[82]}, ${
                      faces[0].vertices[83]
                    }`,
                    left_42: `${faces[0].vertices[84]}, ${
                      faces[0].vertices[85]
                    }`,
                    left_43: `${faces[0].vertices[86]}, ${
                      faces[0].vertices[87]
                    }`,
                    left_44: `${faces[0].vertices[88]}, ${
                      faces[0].vertices[89]
                    }`,
                    left_45: `${faces[0].vertices[90]}, ${
                      faces[0].vertices[91]
                    }`,
                    left_46: `${faces[0].vertices[92]}, ${
                      faces[0].vertices[93]
                    }`,
                    left_47: `${faces[0].vertices[94]}, ${
                      faces[0].vertices[95]
                    }`,
                    middle_48: `${faces[0].vertices[96]}, ${
                      faces[0].vertices[97]
                    }`,
                    middle_49: `${faces[0].vertices[98]}, ${
                      faces[0].vertices[99]
                    }`,
                    middle_50: `${faces[0].vertices[100]}, ${
                      faces[0].vertices[101]
                    }`,
                    middle_51: `${faces[0].vertices[102]}, ${
                      faces[0].vertices[103]
                    }`,
                    middle_52: `${faces[0].vertices[104]}, ${
                      faces[0].vertices[105]
                    }`,
                    middle_53: `${faces[0].vertices[106]}, ${
                      faces[0].vertices[107]
                    }`,
                    middle_54: `${faces[0].vertices[108]}, ${
                      faces[0].vertices[109]
                    }`,
                    middle_55: `${faces[0].vertices[110]}, ${
                      faces[0].vertices[111]
                    }`,
                    middle_56: `${faces[0].vertices[112]}, ${
                      faces[0].vertices[113]
                    }`,
                    middle_57: `${faces[0].vertices[114]}, ${
                      faces[0].vertices[115]
                    }`,
                    middle_58: `${faces[0].vertices[116]}, ${
                      faces[0].vertices[117]
                    }`,
                    middle_59: `${faces[0].vertices[118]}, ${
                      faces[0].vertices[119]
                    }`,
                    middle_60: `${faces[0].vertices[120]}, ${
                      faces[0].vertices[121]
                    }`,
                    middle_61: `${faces[0].vertices[122]}, ${
                      faces[0].vertices[123]
                    }`,
                    middle_62: `${faces[0].vertices[124]}, ${
                      faces[0].vertices[125]
                    }`,
                    middle_63: `${faces[0].vertices[126]}, ${
                      faces[0].vertices[127]
                    }`,
                    middle_64: `${faces[0].vertices[128]}, ${
                      faces[0].vertices[129]
                    }`,
                    middle_65: `${faces[0].vertices[130]}, ${
                      faces[0].vertices[131]
                    }`,
                    middle_66: `${faces[0].vertices[132]}, ${
                      faces[0].vertices[133]
                    }`,
                    middle_67: `${faces[0].vertices[134]}, ${
                      faces[0].vertices[135]
                    }`,

                    anger: vm.result[0].scores.anger,
                    contempt: vm.result[0].scores.contempt,
                    disgust: vm.result[0].scores.disgust,
                    fear: vm.result[0].scores.fear,
                    happiness: vm.result[0].scores.happiness,
                    neutral: vm.result[0].scores.neutral,
                    sadness: vm.result[0].scores.sadness,
                    surprise: vm.result[0].scores.surprise,
                    image: canvas.toDataURL("image/png"),
                    leftPx: vm.result[0].faceRectangle.left,
                    topPx: vm.result[0].faceRectangle.top,
                    widthPx: vm.result[0].faceRectangle.width,
                    heightPx: vm.result[0].faceRectangle.height,
                    session: sessionId + 1
                  })
                  .then(function(response) {
                    console.log("response from server", response);
                  })
                  .catch(function(response) {
                    console.log("error", response);
                  });
              });
          }
        }
      }
      initExample();
    })();
  },
  methods: {
    sharinganButton: function() {
      // console.log('This from sharinganButton', this);
    }
  },
  computed: {}
};

var SessionsPage = {
  template: "#sessions-page",
  data: function() {
    return {
      statsEmotions: [],
      emotions: []
    };
  },
  watch: {},
  created: function() {},
  mounted: function() {
    axios.get("/v1/visual_prowesses?session_emotions=true").then(
      function(response) {
        this.statsEmotions = response.data;
        console.log(response.data);
      }.bind(this)
    );
  },
  methods: {
    currentEmotionsChart: function(statsEmotion, index) {
      var chart = AmCharts.makeChart("currentEmotion-chartdiv" + index, {
        type: "serial",
        theme: "black",
        legend: {
          useGraphSettings: true
        },
        dataProvider: statsEmotion,
        valueAxes: [
          {
            integersOnly: false,
            maximum: 100,
            minimum: 0,
            reversed: false,
            axisAlpha: 0,
            dashLength: 5,
            gridCount: 10,
            position: "left",
            title: "Emotions taken"
          }
        ],
        startDuration: 0,
        graphs: [
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            hidden: false,
            title: "Anger",
            valueField: "anger",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Contempt",
            valueField: "contempt",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Disgust",
            valueField: "disgust",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Fear",
            valueField: "fear",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Happiness",
            valueField: "happiness",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Neutral",
            valueField: "neutral",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Sadness",
            valueField: "sadness",
            fillAlphas: 0
          },
          {
            balloonText: "[[title]]: [[value]]",
            bullet: "round",
            title: "Surprise",
            valueField: "surprise",
            fillAlphas: 0
          }
        ],
        chartCursor: {
          cursorAlpha: 0,
          zoomable: true
        },
        categoryField: "id",
        categoryAxis: {
          gridPosition: "start",
          axisAlpha: 0,
          fillAlpha: 0.05,
          fillColor: "#000000",
          gridAlpha: 0,
          position: "top"
        },
        gridAlpha: 0,
        position: "top"
      });
    }
  },
  computed: {
    sessionEmotions: function() {
      this.statsEmotions.forEach(function(emotion) {
        return emotion.emotions;
      });
    }
  }
};

var AboutPage = {
  template: "#about-page",
  data: function() {
    return {
      message:
        "Uchiha is a web-based app that analyzes emotions in human faces. Uchiha uses the computer’s webcam and the TrackingJS library to track human faces and then sends that data to the Microsoft Emotions API to determine which emotion that face is expressing. Uchiha then overlays various icons over the human faces to indicate the emotion each face is expressing."
    };
  },
  mounted: function() {},
  methods: {},
  computed: {}
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      fullName: "",
      birthDate: "",
      gender: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        userName: this.userName,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        fullName: this.fullName,
        birthDate: this.birthDate,
        gender: this.gender
      };
      axios
        .post("/v1/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/visual_prowess", component: VisualProwessPage },
    { path: "/sharingan", component: SharinganPage },
    { path: "/about", component: AboutPage },
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage },
    { path: "/sessions", component: SessionsPage },
    { path: "/user", component: UserPage }
  ]
});

var app = new Vue({
  el: "#app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});
