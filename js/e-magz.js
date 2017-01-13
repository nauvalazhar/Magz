$(function(){
	var overlay = {
		show: function() {
			$(".overlay").remove();
			$("body").append($("<div/>", {
				class: "overlay"
			}).fadeIn());
		},
		hide: function() {
			$(".overlay").fadeOut(function(){
			});
		},
		tap: function(func) {
			$(document).on("click", ".overlay", function(){
				func.call();
			});
		}
	}

	var isDevice = {
		mobile: function() {		
			if($(window).outerWidth(true) <= 425) {
				return true;
			}else{
				return false;
			}
		},
		tablet: function() {
			if($(window).outerWidth(true) <= 768) {
				return true;
			}else{
				return false;
			}
		},
		desktop: function() {
			if($(window).outerWidth(true) >= 1024) {
				return true;
			}else{
				return false;
			}
		}
	}

	var stickyElementGroup = function() {
		var menu = $(".menu").offset().top;
		var stickyElement = function() {	
			if($(window).scrollTop() > menu) {
				$(".menu.fixed").remove();
				$(".menu").after($("<div/>", {
					class: "menu fixed",
					css: {
						height: $(".menu").outerHeight(),
						position: "fixed",
						top: 0,
						right: 0,
						left: 0
					},
					html: $(".menu").html()
				}));
			}else{
				$(".menu.fixed").remove();
			}
		};
	
		$(window).bind("scroll", function(){
			stickyElement();
		});
	}

	$(window).on("resize", function(){
		if(isDevice.desktop()) {	
			stickyElementGroup();
		}
	});

	$(document).on("ready", function(){
		if(isDevice.desktop()) {	
			stickyElementGroup();
		}
	});

	// love
	$(".love").each(function(){
		$(this).find("div").html($.number($(this).find("div").html()));
		$(this).click(function(){
			var countNow = $(this).find("div").html().replace(',', '');
			if(!$(this).hasClass("active")) {
				$(this).find(".animated").remove();
				$(this).addClass("active");
				$(this).find("i").removeClass("ion-android-favorite-outline");
				$(this).find("i").addClass("ion-android-favorite");
				$(this).find("div").html(parseInt(countNow) + 1);
				$(this).find("div").html($.number($(this).find("div").html()));
				$(this).append($(this).find("i").clone().addClass("animated"));
				$(this).find("i.animated").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e){
					$(this).remove();
				  $(this).off(e);
				});
				// add some code ("love")
			}else{
				$(this).find(".animated").remove();
				$(this).removeClass("active");
				$(this).find("i").addClass("ion-android-favorite-outline");
				$(this).find("i").removeClass("ion-android-favorite");
				$(this).find("div").html(parseInt(countNow) - 1);
				$(this).find("div").html($.number($(this).find("div").html()));

				// add some code ("unlove")
			}
			return false;
		});
	});

	// newsletter
	$(".newsletter").submit(function(){
		var $this = $(this),
		newsletter = {
			start: function() {
				$this.find(".icon").addClass("spin");
				$this.find(".icon i").removeClass("ion-ios-email-outline");
				$this.find(".icon i").addClass("ion-load-b");
				$this.find(".icon h1").html("Please wait ...");
				$this.find(".btn").attr("disabled", true);
				$this.find(".email").attr("disabled", true);
			},
			end: function() {
				$this.find(".icon").removeClass("spin");
				$this.find(".icon").addClass("success");
				$this.find(".icon i").addClass("ion-checkmark");
				$this.find(".icon i").removeClass("ion-load-b");
				$this.find(".icon h1").html("Thank you!");
				$this.find(".email").val("");				
				$this.find(".btn").attr("disabled", false);
				$this.find(".email").attr("disabled", false);
				$.toast({
					text: "Thanks for subscribing!",
					position: 'bottom-right',
					bgcolor: '#E01A31',
					icon: 'success',
					heading: 'Newsletter',
					loader: false
				});
			},
			error: function() {
				$this.find(".icon").removeClass("spin");
				$this.find(".icon").addClass("error");
				$this.find(".icon i").addClass("ion-ios-close-outline");
				$this.find(".icon i").removeClass("ion-load-b");
				$this.find(".icon h1").html("Failed, try again!");
				$this.find(".btn").attr("disabled", false);
				$this.find(".email").attr("disabled", false);
				$.toast({
					text: "Failed, network error. Please try again!",
					position: 'bottom-right',
					icon: 'error',
					heading: 'Newsletter',
					loader: false
				});
			}
		}

		if($this.find(".email").val().trim().length < 1) {
			$this.find(".email").focus();
		}else{
			/* 
			 * Add your ajax code
			 * ------------------
			 * For example:
			 * $.ajax({
			 * 		url: "subscribe_url",
			 * 		type: "post",
			 *  	data: $this.serialize(),
			 * 		error: function() {
			 * 			newsletter.error();
			 * 		},	
			 * 		beforeSend: function() {
			 * 			newsletter.start();
			 * 		},	
			 * 		success: function() {
			 * 			newsletter.end();
			 * 		}
			 * });
			 });
			*/

			newsletter.start();

			setTimeout(function(){
				newsletter.end();
			}, 2000);
		}

		return false;
	});

	// search
	$(".search-toggle").click(function(){
		$("header .search").animate({
			width: 200,
			left: -196,
			opacity: .8
		});
		$(this).addClass("active");
		$("header .search .form-control").focus();
		return false;

	});

	$(document).click(function(e){
		if(e.target.className !== 'form-control search-input') {		
			$("header .search").animate({
				width: 0,
				left: 0,
				opacity: 0
			});
			$(".search-toggle").removeClass("active");
		}
	});

  $("#featured").carousel();

  $("#featured figure img").each(function(){
  	$(this).parent().css({
  		backgroundImage: 'url('+$(this).attr('src')+')',
  		backgroundSize: 'cover',
  		backgroundRepeat: 'no-repeat',
  		backgroundPosition: 'center'
  	});
  	$(this).remove();
  });

  $("#headline").carousel({
  	interval: 5000
  });

  // Mobile
  var mobileStyle = {
  	ready: function() {
  		mobileStyle.notReady();
  		$(".sidebar").hide();

  		$(".search").css({
  			display: "block",
  			width: "100%"
  		});
  		$("body").prepend($("<div/>", {
  			class: "mobile-header",
  		})
  		.prepend($("<div/>", {
  				class: "mobile-toggle-menu",
  				html: "<i class='ion-navicon'></i>"
  		}))
  		.append($("<div/>", {
  				class: "mobile-header-title",
  				html: $("header .brand a").clone()
  		}))
  		.append($("<div/>", {
  			class: "mobile-header-category",
  			html: "<i class='ion-android-more-vertical'></i>"
  		})))
  		.prepend($("<div/>", {
  			class: "divider-top"
  		}))
  		.prepend($("<div/>", {
  			class: "mobile-sidemenu"
  		})
  		.html(
  			$(".search")
  			.clone()
  		));

  		if($(".sidebar").length) {
  			$("body")
	  		.prepend($("<div/>", {
	  			class: "mobile-sidebar-toggle",
	  			html: "<i class='ion-ios-arrow-down'></i>"
	  		}));
  		}

  		$(".mobile-sidemenu").find(".search input")
  		.wrap($("<div/>", {
  			class: "input-group"
  		}));

  		$(".mobile-sidemenu").find(".search .input-group")
  		.prepend(
  			$("<div/>", {
  				class: "input-group-addon",
  				html: "<i class='ion-search'></i>"
			}));

  		$(".mobile-sidemenu").find(".search .input-group")
  		.append(
  			$("<div/>", {
  				class: "input-group-btn",
  				html: "<button type='submit' class='btn btn-primary'><i class='ion-ios-arrow-thin-right'></i></button>"
			}));

  		$(".mobile-sidebar-toggle").on("click", function() {
  			if($(this).hasClass("active")) {
	  			$(".sidebar").slideUp();
	  			$("body").css({
	  				overflow: 'auto'
	  			});
	  			$(this).removeClass("active");
  			}else{
	  			$(".sidebar").slideDown();
	  			$("body").css({
	  				overflow: 'hidden'
	  			});
	  			$(this).addClass("active");
  			}
  		});

  		$(".mobile-toggle-menu").on("click", function() {
  			$(".mobile-sidemenu .title").remove();
  			$(".mobile-sidemenu").prepend($("<div/>", {
  				class: "title",
  				html: "Menus"
  			}));
  			$(".mobile-sidemenu .search").show();
  			$(".mobile-sidemenu ul").remove();
				$(".mobile-sidemenu").append($(".topbar-nav").clone());
 				$(this).addClass("active");
 				$(".mobile-sidemenu").animate({
 					left: 0
 				}, 100, function(){
	 				overlay.show();
 				});

 				overlay.tap(function() {
 					$(".mobile-sidemenu").animate({
 						left: -$(".mobile-sidemenu").outerWidth()
 					}, 100);
 					overlay.hide();
 				});
  		});

  		$(document).on("click", ".mobile-header-category", function() {
  			$(".mobile-sidemenu .title").remove();
  			$(".mobile-sidemenu").prepend($("<div/>", {
  				class: "title",
  				html: "Categories"
  			}));
  			$(".search").hide();
  			$(".mobile-sidemenu ul").remove();
				$(".mobile-sidemenu").append($(".menu .container").html());
 				$(this).addClass("active");
 				$(".mobile-sidemenu").animate({
 					left: 0
 				}, 100, function(){
	 				overlay.show();
 				});

 				overlay.tap(function() {
 					$(".mobile-sidemenu").animate({
 						left: -$(".mobile-sidemenu").outerWidth()
 					}, 100);
 					overlay.hide();
 				});

				$(".mobile-sidemenu ul li.magz-dropdown > a").click(function() {
					var $this = $(this);

					if(!$this.parent().hasClass("active")) {
						$this.parent().find("> ul").slideDown();
						$this.parent().addClass("active");
						$this.parent().find("li").removeClass("active");
					}else{
						$this.parent().find("ul").slideUp();
						$this.parent().removeClass("active");
						$this.parent().parent().removeClass("active");
					}
					return false;
				})
  		});
  	},
  	notReady: function() {
  		$(".mobile-sidemenu, .mobile-sidebar-toggle, .divider-top, .mobile-header").remove();
  		$(".search").removeAttr("style");
  		$(".sidebar").show();
  	}
  };

  $(document).on("ready", function() {
  	if(isDevice.tablet()) {
  		mobileStyle.ready();
  	}else{
  		mobileStyle.notReady();
  	}
  });
  $(window).on("resize ready", function() {
  	if(isDevice.tablet()) {
  		mobileStyle.ready();
  	}else{
  		mobileStyle.notReady();
  	}
  });

  $("#featured").swipe({
  	swipe: function(event, direction) {
  		if(direction == 'right') {
  			$("#featured").carousel('prev');
  		}else if(direction == 'left') {
  			$("#featured").carousel('next');
  		}
  	}
  })

  // floating label
  $(".floating.focus").each(function(){
  	$(this).find(".form-control").focus(function(){
  		$(this).parent().addClass("focused");
  	}).on("blur", function(){
  		if($(this).val().trim().length < 1) {
	  		$(this).parent().removeClass("focused");
  		}
  	});
  });

  // browser
	if($.browser.safari) {
		$("head").append($("<link/>", {
			rel: "stylesheet",
			href: "css/safari.css"
		}));
	}else if($.browser.mozilla) {
		$(".social li").each(function() {
			$(this).find("rect").attr("width", "100%");
			$(this).find("rect").attr("height", "100%");
		});
	}
});