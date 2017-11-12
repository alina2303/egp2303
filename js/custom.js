/*global jQuery:false */
jQuery(document).ready(function($) {
"use strict";

		//add some elements with animate effect
		$(".box").hover(
			function () {
			$(this).find('span.badge').addClass("animated fadeInLeft");
			$(this).find('.ico').addClass("animated fadeIn");
			},
			function () {
			$(this).find('span.badge').removeClass("animated fadeInLeft");
			$(this).find('.ico').removeClass("animated fadeIn");
			}
		);
	
	(function() {

		var $menu = $('.navigation nav'),
			optionsList = '<option value="" selected>Go to..</option>';

		$menu.find('li').each(function() {
			var $this   = $(this),
				$anchor = $this.children('a'),
				depth   = $this.parents('ul').length - 1,
				indent  = '';

			if( depth ) {
				while( depth > 0 ) {
					indent += ' - ';
					depth--;
				}

			}
			$(".nav li").parent().addClass("bold");

			optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
		}).end()
		.after('<select class="selectmenu">' + optionsList + '</select>');
		
		$('select.selectmenu').on('change', function() {
			window.location = $(this).val();
		});
		
	})();

		//Navi hover
		$('ul.nav li.dropdown').hover(function () {
			$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
		}, function () {
			$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
		});
		

});

$(document).ready(function() {
	$('.arrow').each(function() {
		$(this).on('click', function() {
			$(this).closest('.hidden-block').find('.text-holder').toggleClass('open');
			console.log(1);
		});
	});
});



// Jquery Test Plugin

(function ($) {
	$.fn.test = function (testData) {
		if ( !(testData instanceof Array) ) {
			console.warn(testData + ' is not an Array');
			return;
		}
		var form = this,
				answers = {},
				counter = 0,
				drugAnswersCounter = 0,
				drugBloksCounter = 0,
				rightAnswers = 0,
				wrongAnswers = 0;
		
		function updateCounters (status, target) {
			var $counter = $(target).closest('.bott-block').find('.counter');
			counter++;
			if (status) {
				rightAnswers++;
			} else {
				wrongAnswers++;
			}
			$counter.find('.counter-right').html(rightAnswers);
			$counter.find('.counter-wrong').html(wrongAnswers);
			// console.log('total', counter);
		}

		form.on('change', function (e) {
			console.log(1)
			var targetName = e.target.name,
					rightAnswers = answers[targetName],
					$formGroup = $(e.target).closest('.form-group'),
					checkboxes,
					i = 0,
					checked = [];
			if (rightAnswers.length === 1) {
				if (rightAnswers[0] === e.target.value) {
					makeRight(e.target, $formGroup);
				} else {
					makeWrong(e.target, $formGroup);
				}
			} else {
				checkboxes = form[0].elements[targetName];
				for (i = 0; i < checkboxes.length; i++) {
					if (checkboxes[i].checked) {
						checked.push(checkboxes[i].value);
					}
				}

				checked.sort();
				rightAnswers.sort();
				if (checked.length === rightAnswers.length && checked.toString() === rightAnswers.toString()) {
					makeRight(e.target, $formGroup);
				} else if (checked.length === rightAnswers.length) {
					makeWrong(e.target, $formGroup);
				}
			};

		}).on('submit', function (e) {
			e.preventDefault();
		});

		function makeRight(target, $formGroup) {
			if ($formGroup) {
				$formGroup.addClass('question-right');
			}
			updateCounters(true, target);
		}
		function makeWrong(target, $formGroup) {
			if ($formGroup) {
				$formGroup.addClass('question-wrong');
			}
			updateCounters(false, target);
		}

		function createInputs (string, ans, id) {
			var type = string.match(/\|(.+)}}/)[1],
					options = string.match(/{{(.+)\|/)[1],
					inputs,
					inputsHtml;
			options = options.split(/\,\s?/);
			type = $.trim(type.toLowerCase());
			if (type === "radio") {
				inputs = typeRadio(options, id);
			} else if (type === "checkbox") {
				inputs = typeCheckbox(options, id);
			} else if (type === "link") {
				inputs = typeLink(options, id);
			} else if (type === "links-clear") {
				inputs = typeLinkCl(options, id);
			} else if (type === "image") {
				inputs = typeImage(options, id);
			} else if (type === "cell") {
				inputs = typeCell(options, id);
			} else if (type === "drugdrop") {
				inputs = typeDrug(options, id);
			} else {
				inputs = typeSelect(options, id);
			}
			
			inputsHtml = inputs[0].outerHTML || inputs[0].innerHTML;
			string = string.replace(/{{.+}}/, inputsHtml);

			grupDropInit();			

			if (typeof ans === 'string') {
				ans = [ans];
			}
			answers[id] = ans;
			return string;
		}

		// inputs constructors
		function typeSelect (data, id) {
			var select = $('<select>');
			select
					.attr('name', id);
			data.forEach(function (item) {
				$('<option>')
					.html(item)
					.appendTo(select);
			});
			return select;
		}
		function typeCheckbox (data, id) {
			var group = $('<span>');
			data.forEach(function (item, i) {
				$inputItem = $('<div>').addClass('input-item');

				$('<input>')
					.attr('type', 'checkbox')
					.attr('value', item)
					.attr('name', id)
					.attr('id', id + '_' + i)
					// .html(item)
					.appendTo($inputItem);
				$('<label>')
					.attr('for', id + '_' + i)
					.html(item)
					.appendTo($inputItem);

				$inputItem.appendTo(group);
			});
			return group;
		}
		function typeRadio (data, id) {
			var group = $('<div>');
			data.forEach(function (item, i) {

				$inputItem = $('<div>').addClass('input-item');
					
				$('<input>')
					.attr('type', 'radio')
					.attr('name', id)
					.attr('value', item)
					.attr('id', id + '_' + i)
					// .html(item)
					.appendTo($inputItem);
				$('<label>')
					.attr('for', id + '_' + i)
					.html(item)
					.appendTo($inputItem);

				$inputItem.appendTo(group);

			});
			return group;
		}
		function typeLink (data, id) {
			var group = $('<span>');
			data.forEach(function (item, i) {

				$inputItem = $('<div>')
					.addClass('input-item')
					.addClass('input-item links');

				$('<input>')
					.attr('type', 'checkbox')
					.attr('value', item)
					.attr('name', id)
					.attr('id', id + '_' + i)
					.addClass('box-link')
					// .html(item)
					.appendTo($inputItem);
				$('<label>')
					.attr('for', id + '_' + i)
					.html(item)
					.appendTo($inputItem);

				$inputItem.appendTo(group);
				
			});
			return group;
		}
		function typeLinkCl (data, id) {
			var group = $('<span>');
			data.forEach(function (item, i) {

				$inputItem = $('<div>')
					.addClass('input-item')
					.addClass('input-item links links-clear');

				$('<input>')
					.attr('type', 'checkbox')
					.attr('value', item)
					.attr('name', id)
					.attr('id', id + '_' + i)
					.addClass('box-link')
					// .html(item)
					.appendTo($inputItem);
				$('<label>')
					.attr('for', id + '_' + i)
					.html(item)
					.appendTo($inputItem);

				$inputItem.appendTo(group);
				
			});
			return group;
		}

		function typeImage (data, id) {
			var group = $('<span>');
			data.forEach(function (item, i) {

				$inputItem = $('<div>')
					.addClass('input-item')
					.addClass('input-item links links-image');

				$('<input>')
					.attr('type', 'checkbox')
					.attr('value', item)
					.attr('name', id)
					.attr('id', id + '_' + i)
					.addClass('box-link')
					// .html(item)
					.appendTo($inputItem);
				$('<label>')
					.attr('for', id + '_' + i)
					.html(item)
					.appendTo($inputItem);

				$inputItem.appendTo(group);
				
			});
			return group;
		}

		function typeCell (data, id) {
			var tableRow = $('<tr>');
			var  itemsArr = '';

			data.forEach(function (item, i, array) {

				var isLast = array.length - 1 === i;

				$inputTd = $('<td>');

				$inputItem = $('<div>')
					.addClass('input-item')
					.addClass('input-item links links-clear');

				$('<input>')
					.attr('type', 'checkbox')
					.attr('value', item)
					.attr('name', id)
					.attr('id', id + '_' + i)
					.addClass('box-link')
					// .html(item)
					.appendTo($inputItem);
				$('<label>')
					.attr('for', id + '_' + i)
					.html(item)
					.appendTo($inputItem);

				$inputItem.appendTo($inputTd);
				$inputTd.appendTo(tableRow);
				if (i % 2 && i !== 0) {
					itemsArr += tableRow.get(0).outerHTML;
					tableRow = $('<tr>');
				} else if (isLast) {
					itemsArr += tableRow.get(0).outerHTML;
				}
			});
			
			// $inputItem.appendTo(group);

			function wrappByTable(data) {
				return '<div class="table-holder"><table><tbody><tr><th><img src="img/th-1.png" /></th><th><img src="img/th-2.png" /></th></tr>'+data+'</tbody></table><div/>'
			}
			group = $.parseHTML( wrappByTable(itemsArr) );
			// console.log("group", group);
			return group;
		}

		function typeDrug(data, id) {
			var group = $('<div class="answers"></div>');
			var list = $('<ul></ul>');
			list.html(data.toString());
			var input = $('<input>')
				.attr('type', 'hidden');

			list.appendTo(group);
			input.appendTo(group);
			return group;
		}

		var grupDropInit = function ($question, answers) {
			if (!answers) {return}
			$(function () {
				$question.find(".drug-block").each(function () {
					$self = $(this);
					var elStartTopPos = $self.offset().top,
						elStartLeftPos = $self.offset().left;
					$self.draggable({ revert: "invalid" });
				})
			});
			$question.find('.drop-block').each(function (i) {
				var dataDrop = $(this).data('drop').toString();
				var rightEl = answers[i][dataDrop];
				var $self = $(this);
				$self.droppable({
					// accept: rightEl,
					drop: function (event, ui) {
						var $eventTarget = $(ui.draggable[0]);
						var $question = $eventTarget.closest('.form-group');

						drugAnswersCounter ++;

						if (rightEl === $eventTarget.attr('id')) {
							$(this)
								.addClass("valid");
						
							makeRight($eventTarget);

							} else {
								$(this)
									.addClass("error");

								makeWrong($eventTarget);
						}

						function nextQuestion() {
							$question
								.addClass('hidden')
								.next()
								.removeClass('hidden');
						}


						if (drugAnswersCounter === answers.length) {

							$question
								.addClass('question-wrong');

							drugAnswersCounter = 0;
							drugBloksCounter ++;
						}

						if (drugBloksCounter === testData.length) {
							form.html('<span class="text-res"> Du er nu færdig med opgaven. Du havde ' + rightAnswers + ' rigtige ud af ' + testData.length + '.</span>');
						}
					}
				});
		
			})
		}
		
		// enter point
		testData.forEach(function (data, i) {
			var $question,
			id = parseInt(Math.random() * 10000000000000),
			$right = $('<span>'),
			$wrong = $('<span>'),
			$icons,
			$button;
			$right
			.addClass('right-label')
			.html(data.right);
			$wrong
			.addClass('wrong-label')
			.html(data.wrong);
			// $icons = $('<img src="http://www.psdgraphics.com/file/right-check-mark.jpg" class="right-icon">')
			$button = $('<div class="btn-holder"><button>Next</button></div>')
			$button.on('click', function () {
				$question
				.addClass('hidden')
				.next()
				.removeClass('hidden');
				
				if (counter === testData.length) {
					form.html('<span class="text-res"> Du er nu færdig med opgaven. Du havde '+rightAnswers+' rigtige ud af '+testData.length+'.</span>');
				}
			})

			console.log(i);
			
			$question = $('<div>')
			.addClass('form-group')
			.addClass(i ? 'hidden' : '')
			.attr('id', id)
			.html(createInputs(data.text, data.answers, id))
			// .append($icons)
			.append($right)
			.append($wrong)
			.append($button)
			.appendTo(form);
			
			grupDropInit($question, data.answers);
		})
		
	}
})(jQuery);

$(document).on('keypress', function(e) {
	e.preventDefault();
});



// $(document).ready(function(){
//   PointerEventsPolyfill.initialize({});
// });