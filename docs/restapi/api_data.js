define({ "api": [
  {
    "type": "get",
    "url": "/actors/:id",
    "title": "Retrieve a single Actor",
    "name": "GetActor",
    "group": "Actor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Actor ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Actor"
  },
  {
    "type": "get",
    "url": "/actors",
    "title": "Retrieve all Actors",
    "name": "GetActors",
    "group": "Actor",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "List",
            "description": "<p>of Actors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Actor"
  },
  {
    "type": "get",
    "url": "/actors/:id/doctors",
    "title": "Retrieve all doctors portrayed by an Actor",
    "name": "GetDoctorsForActor",
    "group": "Actor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Actor ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "List",
            "description": "<p>of Doctors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Actor"
  },
  {
    "type": "get",
    "url": "/directors/:id",
    "title": "Retrieve a single Director",
    "name": "GetDirector",
    "group": "Director",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Director ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Director ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The Director's name.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Director"
  },
  {
    "type": "get",
    "url": "/directors",
    "title": "Retrieve all Directors",
    "name": "GetDirectors",
    "group": "Director",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "List",
            "description": "<p>of Directors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Director"
  },
  {
    "type": "get",
    "url": "/directors/:id/serials",
    "title": "Retrieve all serials by a Director",
    "name": "GetSerialsForDirector",
    "group": "Director",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Director ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Director"
  },
  {
    "type": "get",
    "url": "/doctors/:id/actors",
    "title": "Retrieve all actors who portrayed a Doctor",
    "name": "GetActorsForDoctor",
    "group": "Doctor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Doctor ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Doctor"
  },
  {
    "type": "get",
    "url": "/doctors/:id",
    "title": "Retrieve a single Doctor",
    "name": "GetDoctor",
    "group": "Doctor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Doctor ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Doctor ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "incarnation",
            "description": "<p>Incarnation name (i.e. &quot;The War Doctor&quot;, &quot;The Fifth Doctor&quot;).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "primaryActor",
            "description": "<p>Actor who usually portrayed this incarnation of The Doctor.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Doctor"
  },
  {
    "type": "get",
    "url": "/doctors",
    "title": "Retrieve all Doctors",
    "name": "GetDoctors",
    "group": "Doctor",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "List",
            "description": "<p>of Doctors.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Doctor"
  },
  {
    "type": "get",
    "url": "/doctors/:id/serials",
    "title": "Retrieve all serials featuring a Doctor",
    "name": "GetSerialsForDoctor",
    "group": "Doctor",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Doctor ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Doctor"
  },
  {
    "type": "get",
    "url": "/episodes/:id",
    "title": "Retrieve a single Episode",
    "name": "GetEpisode",
    "group": "Episode",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Episode ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Episode"
  },
  {
    "type": "get",
    "url": "/episodes",
    "title": "Retrieve all Episodes",
    "name": "GetEpisodes",
    "group": "Episode",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "List",
            "description": "<p>of Episodes.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Episode"
  },
  {
    "type": "get",
    "url": "/seasons/:id",
    "title": "Retrieve a single Season",
    "name": "GetSeason",
    "group": "Season",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Season ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Season ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>What the season is called (i.e. &quot;Season Two&quot;, &quot;Series Four&quot;).</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Season"
  },
  {
    "type": "get",
    "url": "/seasons/:id/serials",
    "title": "Retrieve all serials in a single Season",
    "name": "GetSeasonSerials",
    "group": "Season",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Season ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Season"
  },
  {
    "type": "get",
    "url": "/seasons",
    "title": "Retrieve all Seasons",
    "name": "GetSeasons",
    "group": "Season",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "List",
            "description": "<p>of Seasons.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Season"
  },
  {
    "type": "get",
    "url": "/serials/:id",
    "title": "Retrieve a single Serial",
    "name": "GetSerial",
    "group": "Serial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Serial ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Serial"
  },
  {
    "type": "get",
    "url": "/serials/:id/directors",
    "title": "Retrieve all Directors of a Serial",
    "name": "GetSerialDirectors",
    "group": "Serial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Serial ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Serial"
  },
  {
    "type": "get",
    "url": "/serials/:id/doctors",
    "title": "Retrieve all Doctors who appeared in a Serial",
    "name": "GetSerialDoctors",
    "group": "Serial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Serial ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Serial"
  },
  {
    "type": "get",
    "url": "/serials/:id/episodes",
    "title": "Retrieve all Episodes of a Serial",
    "name": "GetSerialEpisodes",
    "group": "Serial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Serial ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Serial"
  },
  {
    "type": "get",
    "url": "/serials/:id/writers",
    "title": "Retrieve all Writers of a Serial",
    "name": "GetSerialWriters",
    "group": "Serial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Serial ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Serial"
  },
  {
    "type": "get",
    "url": "/serials",
    "title": "Retrieve all Serials",
    "name": "GetSerials",
    "group": "Serial",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "List",
            "description": "<p>of Serials.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Serial"
  },
  {
    "type": "get",
    "url": "/writers/:id/serials",
    "title": "Retrieve all serials by a Writer",
    "name": "GetSerialsForWriter",
    "group": "Writer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Writer ID</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Writer"
  },
  {
    "type": "get",
    "url": "/writers/:id",
    "title": "Retrieve a single Writer",
    "name": "GetWriter",
    "group": "Writer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Writer ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Writer ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The Writer's name.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Writer"
  },
  {
    "type": "get",
    "url": "/writers",
    "title": "Retrieve all Writers",
    "name": "GetWriters",
    "group": "Writer",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "List",
            "description": "<p>of Writers.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/src/restv1.ts",
    "groupTitle": "Writer"
  }
] });
