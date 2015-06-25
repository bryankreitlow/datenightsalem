processPlace = function(place) {
  return {
    name: place[0],
    url: place[1],
    activityTypes: place[2].split(",").map(function(type){
      return type.trim()
    }),
    price: place[3].split(",").map(function(_type) {
      var type = _type.trim();
      if(type === "$") {
        return 0;
      } else if(type === "$$") {
        return 1;
      } else if(type === "$$$") {
        return 2;
      } else if(type === "$$$$") {
        return 3;
      } else if(type === "Free") {
        return -1;
      }
    }),
    distance: place[4],
    city: place[5].split(",").map(function(place) {
      return place.trim()
    }),
    description: place[6]
  }
};

Meteor.startup(function () {
  if (Places.find().count() === 0) {
    var places = [
      ["The Coin Jam","http://www.thecoinjam.com/","Alcohol, Fun","$","0.4","Salem","An arcade slash bar with tasty food"  ],
      ["Marion Polk Food Share","http://www.marionpolkfoodshare.org/Give/GiveTime.aspx","Volunteer, DIY, Food","$","3.5","Salem","Volunteer or take a class"  ],
      ["Habitat for Humanity","http://www.marionpolkfoodshare.org/Give/GiveTime.aspx","Volunteer","$","varies","Salem","Volunteer your time to help families in need"  ],
      ["The Boys & Girls Club","http://bgc-salem.org/how-to-help/volunteer/","Volunteer","$","1.3","Salem","Volunteer with kids"  ],
      ["Red Cross","http://www.redcrossblood.org/give/drive/driveSearchList.jsp?zipSponsor=97302&utm_campaign=rco_search&utm_medium=rco_blood&utm_source=redcross.org&search-submit=","Volunteer","$","0.4","Salem","Donate blood"  ],
      ["Salem Library","http://www.cityofsalem.net/Departments/Library/EventsAndPrograms/adults/Pages/default.aspx","Intellectual","$","0.9","Salem","Peruse the books or attend a lecture"  ],
      ["Silver Falls","http://www.oregonstateparks.org/index.cfm?do=parkPage.dsp_parkPage&parkId=151","Active, Outdoors","$","30","Sublimity","Walk by the waterfalls, dogs are only allowed in some parts so check the website before you go!"  ],
      ["Theater performances at Willamette University","http://willamette.edu/arts/theatre/performances/index.html","Intellectual, Arts, Event","$","0.2","Salem",""  ],
      ["Salem Collectors Market","http://www.salemcollectorsmarket.com/","Arts, Shopping, Event","Free, $, $$","1.4","Salem","Hunt for treasure, start a collection"  ],
      ["Improve at Capitol City Theater","http://www.capitolcitytheater.com/","Arts, Fun","$, $$","0.6","Salem","Enjoy a show or get involved, or both!"  ],
      ["U-Pick","http://www.pickyourown.org/ORsalem.htm","Food, DIY","$, $$","varies","Varies","Enjoy local produce, wear sunscreen!"  ],
      ["Saturday Farmer's Market","http://www.salemsaturdaymarket.com/","Food, Shopping, Music, Event","Free, $, $$","0.3","Salem","Check out all the local vendors and enjoy local music"  ],
      ["Cherry City Food Swap","https://www.facebook.com/pages/Cherry-City-Food-Swappers-Salem-OR/239302626128394","Food, DIY","Free","varies","Salem","Attend a food swap, bring your homemade food item and swap with other DIYers"  ],
      ["Play, learn or buy a new game","http://www.borderlandsgames.com/","Intellectual, Fun, Shopping","Free, $, $$, $$$","0.6","Salem","Check the calendar for tournaments"  ],
      ["Attend a Volcanoes baseball game","http://www.milb.com/index.jsp?sid=t578","Fun, Outdoors, Sports, Event","$$","6.9","Keizer","Catch a baseball game"  ],
      ["Play in the Willamette River","http://goo.gl/maps/91Awf","Fun, Outdoors","Free","2.5","West Salem","Bring your own boat!"  ],
      ["Participate in On Your Feet Friday","http://www.activesalem.com/oyff.php","Fun, Active, Social, Event","Free","0.6","Salem","A free event to explore down town"  ],
      ["Indigo Wellness Center, yoga","http://indigowellnesscenter.com/online-scheduling-yoga-salem-oregon/yoga-class-schedule","Active","$$","1.1","Salem","Yoga classes"  ],
      ["River Rafting with North Santiam River Trips","http://nsrtrips.com/north-santiam-river-report/","Active, Fun, Outdoors","$$$$","32.2","Mill City","Get some friends together, groups of 4-6, costs $350-$450"  ],
      ["Sign up for a Race","http://www.activesalem.com/events/","Active, Fun, Outdoors","$","varies","Salem","Find a local race or find in another town and make a weekend of it!"  ],
      ["Go dancing and karaoke at Southside Speakeasy","http://southsidespeakeasy.com/","Fun, Social, Sports","Free, $","3.7","Salem",""  ],
      ["Willamette Art Center","http://www.willametteartcenter.com/classes/adult-classes/","Fun, Social, Arts","$$$","2.2","Salem","Take a pottery class"  ],
      ["Create a Memory","http://createamemory.org/","Fun, Arts","$, $$, $$$","0.6","Salem","Pottery painting and glass fusion, they will also hold your project over a couple months if you don't finish it right away, so you could do something big and stretch it out over multiple visits. "  ],
      ["Network with Salem Young Professionals","http://www.salemchamber.org/index.php/youngpros.html","Social, Fun","$","varies","Salem","Network with fellow young professionals"  ],
      ["Attend a church service","https://www.google.com/search?q=salem+oregon+churches&oq=salem+oregon+churches&aqs=chrome.0.69i57j0l3j69i62j69i64.3049j0&sourceid=chrome&ie=UTF-8","Social","","varies","Salem","Try a service at a church you've never been to before, explore different demoniations and religions"  ],
      ["Try a Meditation class","https://sites.google.com/site/salemzencenter/","Social, Intellectual","Free, $","3.8","Salem","Wednesdays from 5:30pm"  ],
      ["Salem Food Co-op","http://salemfood.coop/","Food, Social, DIY, Shopping","Free, $","1.8","Salem","Join a food buying club"  ],
      ["Dallas Motor Vu Drive-In","http://www.dallasmotorvu.com/","Arts, Fun, Social","$$","13.5","Dallas","Buy concessions because that's how Drive-Ins make their money!"  ],
      ["Newberg 99W Drive-In","http://www.99w.com/","Arts, Fun, Social","","29.9","Newberg","Buy concessions because that's how Drive-Ins make their money!"  ],
      ["Attend the Oregon Symphony in Salem","https://www.orsymphonysalem.org/index.php","Arts","$","0.5","Salem","Get cultured with the local symphony"  ],
      ["Cinebarre","http://www.cinebarre.com/locations/salem-or","Arts, Alcohol, Food","$$","0.5","Salem","Eat, Drink and Watch! Monday throuh Thursday movie tickets are $6, you can get dinner, drinks and a movie all at the same time!"  ],
      ["Northern Lights Theater Pub","http://www.northernlightstheatrepub.com/","Arts, Alcohol, Food","$","3.5","Salem","Second run theater with food and beer"  ],
      ["Salem Chamber Orchestra","http://salemchamberorchestra.org/","Music, Arts","","0.7","Salem","Local music"  ],
      ["Willamette Master Chorus","http://www.willamettemasterchorus.org/","Music, Arts","","0.5","Salem","Local Chorus. Listen or even join!"  ],
      ["Salem Pops Orchestra","http://www.salempopsorchestra.org/","Music, Arts","","0.4","Salem","Local music"  ],
      ["Salem Youth Symphony","http://www.salemyouthsymphony.org/","Music, Arts","","0.6","Salem","Get a little music by some talented local kids"  ],
      ["Enchanted Forest","http://www.enchantedforest.com/","Fun","","9.7","Turner","Enjoy the rides"  ],
      ["The Ram","http://www.theram.com/oregon/salem.html","Food, Alcohol, Sports","$","0.9","Salem","Sunday nights starting at 9pm, half off drinks and happy hour menu"  ],
      ["Orupa","http://orupasalem.com/","Alcohol, Food, Outdoors","$, $$","0.9","Salem","When the weather is nice, have happy hour drinks on the roof"  ],
      ["f/stop Fitzgerald's","http://www.f-stoppub.com/","Alcohol, Social, Outdoors","$","1.9","Salem","Grab a drink inside this house turned bar and hang out by the fire outside or find a room to play one of the stacks of games in. "  ],
      ["Word of Mouth Bistro","http://www.wordofsalem.com/","Food","$, $$","1","Salem","Have a first class breakfast, great for weekday mornings. On weekends have a snack before you come and prepare to wait in line with playing I-Spy or Sudoku."  ],
      ["Pacific Crest Archery","http://pacificcrestarchery.com/","Active, Sports","$$","2.6","Salem","Get an archery lesson"  ],
      ["Tritac Shooting Solutions","https://tritacshooting.com/","Active, Sports","$$$","1.8","Salem","Take an intro class, then come back to shoot at this new indoor range"  ],
      ["Chemeketa Community College","http://www.chemeketa.edu/classforfun/","Intellectual, Arts","$$","3.9","Salem","Take a continuing education or recreational class"  ],
      ["Get Air Salem Trampoline Park","http://getairsalem.com/home","Fun, Active","$","3.9","Salem","Bounce off the walls, do flips into the foam pit and try not to get hurt!"  ],
      ["Salem Cinema","http://www.salemcinema.com/info.html","Arts, Intellectual, Fun","$","1.1","Salem","Watch an indie or art film at this North Salem theater"  ],
      ["Salem Ale Works","https://www.facebook.com/SalemAleWorks","Alcohol, Social","$","2.4","Salem","Enjoy one of Salem's local breweries"  ],
      ["Vagabond Brewing","http://www.vagabondbrewing.com/","Alcohol, Social, Music","$","3.8","Salem","Enjoy the visiting food trucks and come Mondays for game night"  ],
      ["Wine Tasting","http://www.travelsalem.com/Attractions/Wineries-and-Vineyards","Alcohol,","$, $$","varies","Varies","Explore the Willamette Valley Vineyards, one sip at a time"  ],
      ["Barrel & Keg","https://www.facebook.com/barrelandkeg","Alcohol, Food, Outdoors","$, $$","1.1","Salem","Check out Salem's first and only food cart pod"  ],
      ["Kelly's Cooking School","http://www.kellyshomecenter.com/en/pg-Cooking-School","Food, DIY","$$, $$$","4.3","Salem","Take a cooking class at this locally owned home furnishings store"  ],
      ["Lullu's","http://www.lulluscookingclasses.com/cookingclasses.htm","Food, DIY","$$, $$$","0.5","Salem","Take a cooking class at this downtown shop"  ],
      ["Growl Movement","http://www.growlmovement.com/","Alcohol","$, $$","2.6","Salem, Keizer","Try before you buy at their two locations"  ],
      ["Ricky's Bubbles & Sweets","https://www.facebook.com/pages/Rickys-Bubbles-Sweets-Shoppe/594956577222824","Food, Fun","$, $$","0.7","Salem","Check out the huge variety of dometic, nostalgic candy and toys"  ],
      ["Archive","http://www.archivecoffeeandbar.com/","Alcohol, Food, Social","$","0.7","Salem","Come in during the day for a lively coffee shop, come in after 4pm for a unique, handcrafted drink or sample some of thier delicions small plates. "  ],
      ["Movies in the Park","http://salemmoviesinthepark.com/","Arts, Social, Outdoors, Fun","Free","0.7","Salem","Bring a blanket and watch a movie in the park under the stars!"  ],
      ["Gayle's Italian Market","https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB8QFjAA&url=http%3A%2F%2Fwww.gaylesitalianmarket.net%2F&ei=qF9SVei2B8fHsAWqtIAI&usg=AFQjCNHJtlJyRQIVRqVljYMEPZgtVmoQFw&sig2=8EOUp6_EsdKkV1UJkwdQPQ&bvm=bv.92885102,d.b2w","Food, Shopping, Alcohol","$, $$","0.7","Salem","Check out the Italian Imports, Italian inspired menu and great wine selection"  ],
      ["McMenamin's Boon's Treasury","http://www.mcmenamins.com/events/search/Any?location_id=9","Music, Food, Alcohol, Social","$, $$","1","Salem","Enjoy some live music, or know when to skip it if music isn't your thing, come enjoy this old bank-turned restaurant. "  ],
      ["Half Penny","http://www.thehalfpenny.com/","Music, Alcohol, Food","$, $$","3.3","Salem","Check out the music events, play pool, and happy hour specials"  ],
      ["IKE Box","http://www.isaacsroom.org/ikebox/ike-stage/","Music, Alcohol, Food","$, $$","0.4","Salem","This local Non-profit coffeehouse hosts music shows, check their facebook page for events"  ],
      ["Oregon Crepe Cafe","http://oregoncrepe.com/","Food","$","0.6","Salem","Perfect for lunch or a pick-me-uip at the 3pm slump they have sweet and savory crepes. Gluten Free crepes are available too!"  ]
    ];
    for (var i = 0; i < places.length; i++) {
      var place = processPlace(places[i]);
      Places.insert({
        name: place.name,
        url: place.url,
        activityTypes: place.activityTypes,
        price: place.price,
        distance: place.distance,
        city: place.city,
        description: place.description
      });
    }
  }

  if (Events.find().count() === 0) {
    var events = [{
      title: 'TedX Salem',
      url: 'http://tedxsalem.us/',
      allDay: true,
      price: '75',
      start: '10-3-2015',
      end: '10-3-2015'
    },{
      title: 'Back to the Future 2 - Movies In The Park',
      url: 'http://salemmoviesinthepark.com/',
      price: '10',
      start: '7-11-2015 20:00'
    },{
      title: 'The Boxtrolls - Movies In The Park',
      url: 'http://salemmoviesinthepark.com/',
      price: '10',
      start: '7-18-2015 20:00'
    },{
      title: 'UP - Movies In The Park',
      url: 'http://salemmoviesinthepark.com/',
      price: '10',
      start: '8-8-2015 20:00'
    }];

    for (var j = 0; j < events.length; j++) {
      Events.insert({
        title: events[j].title,
        url: events[j].url,
        start: new Date(events[j].start),
        end: events[j].end ? new Date(events[j].end) : undefined,
        price: events[j].price
      });
    }
  }
});