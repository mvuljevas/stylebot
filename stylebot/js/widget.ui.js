/**
  * stylebot.widget.ui
  * 
  * Basic Mode UI for Stylebot Widget
  **/
  
stylebot.widget.ui = {
    
    isColorPickerVisible: false,
    
    defaults: {
        validSizeUnits: ['px', 'em', '%', 'pt'],
        optionsHeight: 180
    },
    
    groups: [{
        name: 'Text',
        controls: [
        {
            name: 'Font Family',
            id: 'font-family',
            type: 'font-family',
            options: ['Arial', 'Georgia', 'Lucida Grande', 'Times New Roman', 'Verdana'],
            el: null
        },
        {
            name: 'Font Size',
            id: 'font-size',
            type: 'size',
            el: null
        },
        {
            name: 'Font Weight',
            id: 'font-weight',
            type: 'segmented',
            values: ['bold', 'normal'],
            options: ['Bold', 'Normal'],
            el: null
        },
        {
            name: 'Font Style',
            id: 'font-style',
            type: 'segmented',
            values: ['italic', 'normal'],
            options: ['<span style="font-style: italic;">Italic</span>', 'Normal'],
            el: null
        },
        {
            name: 'Font Variant',
            id: 'font-variant',
            type: 'segmented',
            options: ['<span style="font-variant: small-caps;">Small Caps</span>', 'Normal'],
            values: ['small-caps', 'normal'],
            el: null
        },
        {
            name: 'Transform',
            id: 'text-transform',
            type: 'segmented',
            values: ['capitalize', 'uppercase', 'lowercase', 'none'],
            options: ['Abc', 'ABC', 'abc', 'None'],
            el: null
        },
        {
            name: 'Decoration',
            id: 'text-decoration',
            type: 'segmented',
            options: ['<span style="text-decoration: underline;">ab</span>', '<span style="text-decoration: line-through;">ab</span>', '<span style="text-decoration: overline;">ab</span>', 'None'],
            values: ['underline', 'line-through', 'overline', 'none'],
            el: null

        },
        {
            name: 'Line Height',
            id: 'line-height',
            type: 'size',
            el: null
        },
        {
            name: 'Letter Spacing',
            id: 'letter-spacing',
            type: 'size',
            el: null
        }]
    },
    {
        name: 'Color & Background',
        controls:[{
            name: 'Color',
            id: 'color',
            type: 'color',
            el: null
        },
        {
            name: 'Background Color',
            id: 'background-color',
            type: 'color',
            el: null
        }]
    },
    {
        name: 'Borders',
        controls: [
        {
            name: 'Border Style',
            id: 'border-style',
            type: 'select',
            options: [ 'none', 'solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset' ],
            el: null
        },
        {
            name: 'Color',
            id: 'border-color',
            type: 'color',
            el: null
        },
        {
            name: 'Thickness',
            options: ['All', 'Top', 'Right', 'Bottom', 'Left'],
            id: ['border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
            type: 'multi-size',
            el: null
        }]
    },
    {
        name: 'Layout & Visibility',
        controls: [
        {
            name: 'Margins',
            options: ['All', 'Top', 'Right', 'Bottom', 'Left'],
            id: ['margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
            type: 'multi-size',
            el: null
        },
        {
            name: 'Paddings',
            options: ['All', 'Top', 'Right', 'Bottom', 'Left'],
            id: ['padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
            type: 'multi-size',
            el: null
        },
        {
            name: 'Visibility',
            id: 'display',
            type: 'toggle',
            value: 'none',
            el: null
        }]
    }
    ],
    
    // cache of jQuery objects
    cache: {
        box: null,
        header: null,
        headerSelectIcon: null,
        container: null,
        controls: null,
        textfields: null,
        checkboxes: null,
        radios: null,
        selectboxes: null,
        colorSelectorColor: null,
        toggleButtons: null,
        accordionHeaders: null,
        fontFamilyInput: null,
        segmentedControls: null
    },
    
    createBox: function() {
        
        this.cache.box = $('<div>', {
            id: 'stylebot'
        });
        
        
        this.cache.header = $('<div>', {
            id: 'stylebot-header-selector',
            class: 'stylebot-editable-text',
            html: 'custom styles'
        });
        
        this.cache.headerSelectIcon = $('<div>', {
            class: 'stylebot-select-icon'
        })
        .click(function(e) {
            stylebot.toggleSelectionMode();
        });
        
        var url_container = $('<span>', {
            id: 'stylebot-header-url'
        });
        
        var url = $('<span>', {
            html: stylebot.style.cache.url,
            class: 'stylebot-editable-text'
        }).appendTo(url_container);
        
        Utils.makeEditable(url, function(value) {
            stylebot.style.cache.url = value;
        });
        
        $('<div>', {
            id: 'stylebot-header'
        })
        .append(this.cache.header)
        .append(this.cache.headerSelectIcon)
        .append(url_container)
        .appendTo(this.cache.box);
        
        this.cache.container = $('<div>', {
            id: 'stylebot-controls'
        });
        
        // creating controls for different CSS properties
        var len = this.groups.length;
        
        for(var i=0; i<len; i++)
        {
            this.createAccordionHeader(this.groups[i].name).appendTo(this.cache.container);
            
            var group = $('<div>', {
                class: 'stylebot-accordion'
            })
            .appendTo(this.cache.container);

            var len2 = this.groups[i].controls.length;
            for(var j=0; j<len2; j++)
                this.createControl(this.groups[i].controls[j]).appendTo(group);
        }
        
        this.cache.container.appendTo(this.cache.box);
        
        // advanced ui
        stylebot.widget.advanced.create();
        
        // creating options in widget
        var options_div = $('<div>', {
            id: 'stylebot-widget-options'
        });
        
        this.createOption('Mode', this.createButtonSet(['Basic', 'Advanced'], "stylebot-mode", 0, stylebot.widget.toggleMode))
        .appendTo(options_div);
        
        this.createOption('Widget position', this.createButtonSet(['Left', 'Right'], "stylebot-position", 1, stylebot.widget.togglePosition) )
        .appendTo(options_div);
        
        // this.createOption('Selection Specificness', 
        // this.createButtonSet(['Low', 'Medium', 'High'], "stylebot-specificity", 1, stylebot.widget.toggleSpecificity))
        // .appendTo(options_div);
        
        options_div.appendTo(this.cache.box);
        
        // creating main buttons for widget
        var buttons = $('<div>', {
            id: 'stylebot-main-buttons'
        });
        
        this.createButton('Save').appendTo(buttons).click(stylebot.widget.save);
        this.createButton('View CSS').appendTo(buttons).click(stylebot.widget.viewCSS);
        this.createButton('Reset').appendTo(buttons).click(stylebot.widget.resetCSS);
        this.createButton('Reset All').appendTo(buttons).click(stylebot.widget.resetAllCSS);
        buttons.appendTo(this.cache.box);
        
        this.cache.box.appendTo(document.body);
        
        // make title editable
        Utils.makeEditable(this.cache.header, function(value) {
            stylebot.selector.value = value;
            stylebot.unhighlight();
            stylebot.highlight($(value)[0]);
            stylebot.widget.show();
        });
        
        // fill cache with jQuery objects widget UI elements
        this.fillCache();
        
        // open first accordion
        // TODO: Load accordions last opened from cache in background.html
        this.toggleAccordion($(this.cache.accordionHeaders[0]));
        
        // set initial widget position to Right
        stylebot.widget.setPosition('Right');
        
        var lastBt = buttons.find('button').last();
        
        // TAB on last button sets focus to first accordion header
        lastBt.keydown(function(e) {
            if(e.keyCode == 9 && !e.shiftKey)
            {
                e.stopImmediatePropagation();
                e.preventDefault();
                stylebot.widget.ui.cache.accordionHeaders[0].focus();
            }
        });

        // Shift + TAB on first accordion sets focus to last button
        $(this.cache.accordionHeaders[0]).bind('keydown', { lastBt: lastBt }, function(e) {
            if(e.keyCode == 9 && e.shiftKey)
            {
                e.stopImmediatePropagation();
                e.preventDefault();
                e.data.lastBt.focus();
            }
        });
    },
    
    fillCache: function() {
        // controls
        this.cache.controls = $('.stylebot-control');
        // textfields
        this.cache.textfields = $('.stylebot-textfield');
        // checkboxes
        this.cache.checkboxes = $('.stylebot-checkbox');
        // radios
        this.cache.radios = $('.stylebot-radio');
        // select boxes
        this.cache.selectboxes = $('.stylebot-select');
        // color selector color divs
        this.cache.colorSelectorColor = $('.stylebot-colorselector-color');
        // toggle buttons
        this.cache.toggleButtons = $('.stylebot-toggle');
        // accordion headers
        this.cache.accordionHeaders = $('.stylebot-accordion-header');
        // font family input
        this.cache.fontFamilyInput = $('#stylebot-font-family');
        // segmented controls
        this.cache.segmentedControls = $('.stylebot-segmented-control');
    },
    
    createOption: function(option, control) {
        var container = $('<div>', {
            class: 'stylebot-widget-option'
        });
        
        this.createLabel(option)
        .appendTo(container);
        
        return container.append(control);
    },
    
    createAccordionHeader: function(name) {
        return $('<a>', {
            class: 'stylebot-accordion-header',
            tabIndex: 0,
            html: name
        })
        .prepend($('<div>', {
            class: 'stylebot-accordion-icon'
        }))
        .bind('click keydown', function (e) {
            if(e.type == "keydown" && e.keyCode != 13)
                return true;
            e.preventDefault();
            var el = $(e.target);
            if(!el.hasClass('stylebot-accordion-header'))
                el = el.parent();
            stylebot.widget.ui.toggleAccordion(el);
        });
    },
    
    toggleAccordion: function(h) {
        var status = h.hasClass('stylebot-accordion-active');
        if(status)
        {
            h.removeClass('stylebot-accordion-active')
            .next().hide();
        }
        else
        {
            // close all accordion groups
            stylebot.widget.ui.cache.accordionHeaders
            .removeClass('stylebot-accordion-active')
            .next().hide();
            
            h.addClass('stylebot-accordion-active')
            .next().show();
        }
    },
    
    createControl: function(control) {
        var el = $('<div>', {
            class: 'stylebot-control-set'
        });

        this.createLabel(control.name).appendTo(el);
        
        var control_el; // this will contain the control element
        
        // Add controls of different types
        switch(control.type){

            case 'size'             :   control_el = this.createSizeControl(control.id).appendTo(el);
                                        break;
            
            case 'multi-size'       :   control_el = this.createMultiSizeControl(control).appendTo(el); break;
                                        
            case 'color'            :   control_el = this.createTextField(control.id, 10, stylebot.widget.ui.events.onTextFieldKeyUp);
                                        this.createColorPicker(control_el).appendTo(el);
                                        control_el.appendTo(el)
                                        .keyup(function(e){ stylebot.widget.ui.setColorSelectorColor( $(this) ) });
                                        break;
                                        
            case 'checkbox'         :   control_el = this.createCheckbox(null, control.id , control.value).appendTo(el);
                                        break;

            case 'toggle'           :   control_el = this.createToggleButton('Hide', control.id , control.value).appendTo(el);
                                        break;

            case 'select'           :   control_el = this.createSelect(control.id);
                                        this.createSelectOption("Default", control.id, '').appendTo(control_el);
                                        var len = control.options.length;
                                        for(var i=0; i<len; i++)
                                        {
                                            var option = control.options[i];
                                            this.createSelectOption( Utils.capitalize(option), control.id, option).appendTo(control_el);
                                        }
                                        control_el.appendTo(el);
                                        break;

            case 'segmented'        :   control_el = this.createSegmentedControl(control).appendTo(el);
                                        break;
                                        
            case 'font-family'      :   control_el = this.createFontFamilyControl(control).appendTo(el);
                                        break;
        }
        
        // objects (except primitive type) are passed by reference in JS
        control.el = control_el;
        return el;
    },
    
    createTextField: function(property, size, handler) {
        return $('<input>',{
            type: 'text',
            id: 'stylebot-' + property,
            class: 'stylebot-control stylebot-textfield',
            size: size
        })
        .data('property', property)
        .keyup(handler);
    },
    
    createSizeControl: function(property) {
        var container = $('<span>');
        
        // Textfield for entering size
        this.createTextField(property, 2, stylebot.widget.ui.events.onSizeFieldKeyUp)
        .appendTo(container);

        // Select box for choosing unit
        var select = $('<select>', {
            class: 'stylebot-control stylebot-select'
        })
        .change(function(e) {
            $(this).prev().keyup();
        })
        .appendTo(container);
        
        var len = this.defaults.validSizeUnits.length;
        
        for(var i=0; i<len; i++){
            this.createSelectOption(this.defaults.validSizeUnits[i], null, this.defaults.validSizeUnits[i])
            .appendTo(select);
        }
        
        return container;
    },
    
    createMultiSizeControl: function(control) {
        var container = $('<span>', {
            style: 'display: inline-block; margin-left: 50px; margin-top: -10px'
        });
        var len = control.id.length;
        for(var i=0; i<len; i++)
        {
            this.createLabel(control.options[i])
            .appendTo(container);
            
            this.createSizeControl(control.id[i])
            .attr('style', 'margin-bottom: 3px; display: inline-block;')
            .appendTo(container);
        }
        return container;
    },
    
    createFontFamilyControl: function(control) {
        var container = $('<span>');
        
        var select = $('<select>', {
            class: 'stylebot-control stylebot-select'
        })
        .change(function(e) {
            var el = $(this);
            var input = el.next();
            if(el.attr('value') == "Custom")
            {
                input
                .attr('value', '')
                .show();
            }
            else
            {
                input
                .hide()
                .attr('value', el.attr('value'));
            }
            input.keyup();
        })
        .appendTo(container);
        
        // default option
        this.createSelectOption('Default', null, '')
        .appendTo(select);
        
        var len = control.options.length;
        for(var i=0; i<len; i++)
        {
            this.createSelectOption(control.options[i], null, control.options[i])
            .appendTo(select);
        }
        
        // custom option
        this.createSelectOption('Custom', null, 'Custom')
        .appendTo(select);

        // end of select
        
        // create custom font field
        this.createTextField(control.id, 20, stylebot.widget.ui.events.onTextFieldKeyUp)
        .css({
            marginLeft: '110px !important',
            marginTop: '5px',
            display: 'none'
        })
        .appendTo(container);
        
        return container;
    },
    
    createCheckbox: function(text, property, value) {
        var checkbox = $('<input>',{
            type: 'checkbox',
            id: 'stylebot-' + property,
            class: 'stylebot-control stylebot-checkbox',
            value: value
        })
        .data('property', property)
        .click(stylebot.widget.ui.events.onCheckboxChange);
        
        if(text)
        {
            var span = $('<span class="stylebot-control"></span>');
            checkbox.appendTo(span);
            this.createInlineLabel(text).appendTo(span);
            return span;
        }
        else
            return checkbox;
    },
    
    createToggleButton: function(text, property, value) {

        return this.createButton(text)
        .addClass('stylebot-toggle stylebot-control')
        .attr('id', 'stylebot-' + property)
        .data({
            'value': value,
            'property': property
        })
        .click(stylebot.widget.ui.events.onToggle);
    },
    
    createRadio: function(text, name, property, value) {
        var span = $('<span>', {
            id: 'stylebot-' + property,
            class: 'stylebot-control'
        });

        var radio = $('<input>',{
            type: 'radio',
            name: name,
            class: 'stylebot-control stylebot-radio'
        });
        
        if(typeof(property) == 'string')
            radio.attr('value', value);
        else
            radio.attr('value', value.join(','));
        
        radio.data('property', property);
        radio.click(this.events.onRadioClick);
        radio.appendTo(span);
        this.createInlineLabel(text).appendTo(span);
        return span;
    },
    
    createSelect: function(property) {
        return $('<select>', {
            id:'stylebot-' + property,
            class: 'stylebot-control stylebot-select'
        })
        
        .data('property', property)
        .change(this.events.onSelectChange);
    },
    
    createSelectOption: function(text, property, value) {
        var option = $('<option>', {
            class: 'stylebot-select-option',
            html: text,
            value: value
        });
        
        if(property)
            option.data('property', property);
        
        return option;
    },
    
    createColorPicker: function(input) {
        return $('<div>', {
            class:'stylebot-colorselector stylebot-control', 
            tabIndex:0
        })
        .append($('<div>', { class:'stylebot-colorselector-color'}))
        .ColorPicker({
            flat:false,
            onChange: function(hsb, hex, rgb) {
                var colorCode = '#' + hex;
                // set input value to reflect the newly picked color's code
                input.attr('value', colorCode);
                input.keyup();
                // update the color selector color
                stylebot.widget.ui.setColorSelectorColor(input);
            },
            onBeforeShow: function() {
                var color = input.attr('value');
                if(color == "")
                    color = "#ffffff"; // default is white
                $(this).ColorPickerSetColor(color);
                stylebot.widget.ui.isColorPickerVisible = true;
            },
            onHide: function() {
                stylebot.widget.ui.isColorPickerVisible = false;
            }
        })
        .keyup(function(e) {
            // TODO: Toggle visibility of color picker when enter is pressed
            if(e.keyCode == 13) //enter
                $(this).ColorPickerShow();
        });
    },
    
    // Set color selector value by fetching value from connected input textfield
    setColorSelectorColor: function(input) {
        // get the color value
        var color = input.attr('value');
        // get the color selector connected to the input field
        var colorSelector = input.prev().find('div');
        colorSelector.css('backgroundColor', color);
    },

    createLabel: function(text) {
        return $('<label>', {
            class: 'stylebot-label',
            html: text+":"
        });
    },
    
    createInlineLabel: function(text) {
        return $('<label>', {
            class: 'stylebot-inline-label',
            html: text
        });
    },
    
    createButton: function(text) {
        return $('<button>', {
            class: 'stylebot-button',
            html: text
        })
        .mouseup( function(e) { e.target.focus(); } );
    },
    
    createButtonSet: function(buttons, className,  enabledButtonIndex, callback) {
        var container = $('<span>');
        var len = buttons.length;
        for(var i=0; i<len; i++)
        {
            var bt = this.createButton(buttons[i])
            .addClass(className)
            .data('class', className)
            .appendTo(container)
            .click(callback);

            if(i == enabledButtonIndex)
                bt.addClass('stylebot-active-button');
        }
        return container;
    }, 
    
    createSegmentedControl: function(control) {
        var container = $('<span>', {
            class: 'stylebot-control stylebot-segmented-control',
            id: 'stylebot-' + control.id,
        });
        
        var len = control.options.length;
        for(var i=0; i<len; i++)
        {
            var bt = this.createButton( control.options[i] )
            .addClass('stylebot-segmented-button')
            .data({
                 value: control.values[i],
                 property: control.id
            })
            .click(stylebot.widget.ui.events.onSegmentedControlClick)
            .appendTo(container);
        }
        return container;
    },
    
    fillControl: function(control, rule) {
        
        function determineSizeUnit(val) {
            var len = stylebot.widget.ui.defaults.validSizeUnits.length;
            for(var i=0; i<len; i++)
            {
                if( val.indexOf(stylebot.widget.ui.defaults.validSizeUnits[i]) != -1)
                    break;
            }
            return stylebot.widget.ui.defaults.validSizeUnits[i];
        }
        
        var pValue = rule[control.id];

        switch(control.type) {
            
            case 'size'         :       if(pValue == undefined)
                                            return false;
                                        var unit = determineSizeUnit(pValue);
                                        
                                        control.el.find('input')
                                        .attr('value', pValue.replace(unit, '') );
                                        
                                        // set select option
                                        var index = $.inArray( $.trim( String(unit) ), this.defaults.validSizeUnits);
                                        control.el.find('select').attr('selectedIndex', index);
                                        break;
                                        
            case 'multi-size'   :       var len = control.id.length;
                                        var inputFields = control.el.find('input');
                                        var selectInputs = control.el.find('select');
                                        var values = [];
                                        for(var i=0; i<len; i++)
                                            values[i] = rule[ control.id[i] ];
                                        
                                        if(values[0] != undefined)
                                        {
                                            var parts = values[0].split(' ');
                                            // parse value of the form margin: 2px 10px;
                                            if(parts.length == 2)
                                            {
                                                values[0] = "";
                                                values[1] = values[3] = $.trim( parts[0] ); // top & bottom
                                                values[2] = values[4] = $.trim( parts[1] ); // left & right
                                            }
                                            // parse value of the form margin: 2px 10px 8px 6px;                                        
                                            else if(parts.length == 4)
                                            {
                                                values[0] = "";
                                                values[1] = $.trim( parts[0] );
                                                values[2] = $.trim( parts[1] );
                                                values[3] = $.trim( parts[2] );
                                                values[4] = $.trim( parts[3] );
                                            }
                                        }
                                        
                                        for(var i=0; i<len; i++)
                                        {
                                            pValue = values[i];

                                            if(pValue != undefined)
                                            {
                                                var unit = determineSizeUnit(pValue);
                                                var input = $(inputFields[i]);
                                                input.attr( 'value', pValue.replace(unit, '') )
                                                .keyup(); // keyup called to update rules cache as values maybe modified when mode is switched.

                                                var index = $.inArray( $.trim( String(unit) ), this.defaults.validSizeUnits);
                                                $(selectInputs[i]).attr('selectedIndex', index);
                                            }
                                        }
                                        break;

            case 'font-family'  :       if(pValue == undefined)
                                            return false;
                                        
                                        // set input value
                                        var input = control.el.find('input')
                                        .attr('value', pValue);
                                        
                                        var index = $.inArray(pValue, control.options);
                                        if(index != -1)
                                        {
                                            control.el.find('select').attr('selectedIndex', index + 1);
                                            input.hide();
                                        }
                                        else
                                        {
                                            control.el.find('select').attr('selectedIndex', control.options.length + 1);
                                            input.show();
                                        }
                                        break;
                                    
            case 'color'            :   if(pValue == undefined)
                                            return false;
                                        control.el.attr('value', pValue);
                                        this.setColorSelectorColor(control.el);
                                        break;
                                    
            case 'checkbox'         :   if(pValue == control.value)
                                            control.el.attr('checked', true);
                                        else
                                            control.el.attr('checked', false);                                                
                                        break;
                                    
            case 'toggle'           :   if(pValue == control.el.data('value'))
                                            control.el.addClass('stylebot-active-button');
                                        else
                                            control.el.removeClass('stylebot-active-button');
                                        break;
                                    
            case 'select'           :   var index = $.inArray( $.trim( String(pValue) ), control.options);
                                        if(index != -1)
                                            control.el.attr('selectedIndex', index + 1);
                                        break;

            case 'segmented'        :   var index = $.inArray( $.trim( String(pValue) ), control.values);
                                        if(index != -1)
                                            $(control.el.find('button')[index])
                                            .addClass('stylebot-active-button')
                                            .next().css('border-left-width', '0px');
        }
    },
    
    // fill widget
    fill: function() {
        // fill controls
        var len = this.groups.length;
        var rule = stylebot.style.getRule(stylebot.selector.value);

        if(rule)
        {
            for(var i=0; i<len; i++)
            {
                var len2 = this.groups[i].controls.length;
                for(var j=0; j<len2; j++)
                    this.fillControl(this.groups[i].controls[j], rule);
            }
        }
    },
    
    // reset values to default for all controls
    reset: function() {
        this.cache.textfields.attr('value', '');
        this.cache.checkboxes.attr('checked', false);
        this.cache.radios.attr('checked', false);
        this.cache.selectboxes.attr('selectedIndex', 0);
        this.cache.colorSelectorColor.css('backgroundColor', '#fff');
        this.cache.toggleButtons.removeClass('stylebot-active-button');
        this.cache.fontFamilyInput.hide();
        this.cache.segmentedControls.find('.stylebot-active-button')
        .removeClass('stylebot-active-button')
        .next().css('border-left-width', '1px');
    },
    
    // show UI for basic mode
    show: function() {
        this.reset();            // reset all values for controls to default values
        this.fill();             // fill widget with any existing custom styles
        this.updateHeight();
        setTimeout(function() {
            stylebot.widget.ui.cache.accordionHeaders[0].focus();
        }, 0);
        
        $('#stylebot-controls').show();
    },
    
    // hide UI for basic mode
    hide: function() {
        $('#stylebot-controls').hide();
    },
    
    updateHeight: function() {
        this.cache.container.css('height', window.innerHeight - this.defaults.optionsHeight);
    },

    updateRuleCache: function() {
        // stub for now
    }
}