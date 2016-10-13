function FindCase() {


	return new Ext.Panel({
		id: 'fc_findCaseMainPanel',
		anchor: '100% 100%',
		hideMode: 'offsets',
		width: '100%',
		height: '100%',
		layout: 'anchor',
		autoScroll : true,
		items: [ 
		         fc_buildUI(),
		         fc_buildResultsPanel()
		],
//		listeners: {
//    		'afterrender': function() {
//    			//alert('alexalex');
//    			//var aaa = Ext.getCmp('fc_local_case_number_info');
//    			//aaa.hide();
//    		}
//    	},
		buttonAlign: 'center',
		buttons: [
			        {
			        	id: 'fc_clearBtn',
			        	xtype: 'button',
			        	handler: function(button, event) {
			        		Ext.getCmp('saveMsgTbtext').setText('');
			        		fc_params.formPanel.form.reset();
			        	},
			        	text: 'Clear'
			        },
					{
						id: 'fc_searchBtn',
						xtype: 'button',
						handler: function(button, event) {
							fc_search(fc_params);
						},
						text: 'Search'
					},
			        {
			        	id: 'fc_showPrevSearchResultsBtn',
			        	xtype: 'button',
			        	hidden: true,
			        	handler: function(button, event) {
			        		var resultsPanel = Ext.getCmp('fc_resultsPanel');
			        		// var searchPanel = Ext.getCmp('fc_outerUIPanel');
			        		// var backBtn = Ext.getCmp('fc_backToSearchBtn');
			        		// var clearBtn = Ext.getCmp('fc_clearBtn');
			        		// var searchBtn = Ext.getCmp('fc_searchBtn');
			        		// searchPanel.hide();
			        		resultsPanel.show();
			        		// clearBtn.hide();
			        		// searchBtn.hide();
			        		// backBtn.show();
			        		this.hide();
			        	},
			        	text: 'Show Previous Search Results'
			        },
			        {
			        	id: 'fc_backToSearchBtn',
			        	xtype: 'button',
			        	hidden: true,
			        	handler: function(button, event) {
//			        		var resultsPanel = Ext.getCmp('fc_resultsPanel');
//			        		var searchPanel = Ext.getCmp('fc_outerUIPanel');
//			        		var searchBtn = Ext.getCmp('fc_searchBtn');
			        		// var showSearchResultsBtn = Ext.getCmp('fc_showPrevSearchResultsBtn');
			        		// var clearBtn = Ext.getCmp('fc_clearBtn');
			        		// Show 
			        		// resultsPanel.hide();
			        		// searchPanel.show();
			        		// clearBtn.show();
			        		// searchBtn.show();
			        		// showSearchResultsBtn.show();
			        		this.hide();
			        	},
			        	text: 'Back To Search'
			        }
		],
		// fc_params: fc_params
	});

}


function fc_buildUI() {
	return {
		id: 'fc_outerUIPanel',
		hideMode: 'offsets',
		anchor: '100% 100%',
		border: false,
		frame: false,
    	layout: 'form',
    	autoScroll : true,
		items: [
		        {
		        	id: 'fc_centrePanel',
		        	hideMode: 'offsets',
		        	boxMinWidth: 1100,
		        	anchor: '70%',
		        	border: false,
		        	frame: false,
		        	style: {
		                marginLeft: 'auto',
		                marginRight: 'auto'
		            },
		        	// items: [fc_buildFormPanel(fc_params)]
		        }
		]
	};
}


function fc_buildResultsPanel() {
	var panel = {
		id: 'fc_resultsPanel',
		hidden: true,
		anchor: '100% 100%',
		hideMode: 'offsets',
		border: true,
		frame: true,
		layout: 'anchor',
		items: [
		        {
		        	  id: 'fc_innerResultsPanel',
		        	  hideMode: 'offsets',
		        	  anchor: '100% 100%',
		        	  border : false, 
		        	  frame: false,
		        	  style: 'margin:20px 50px 10px 50px;',
		        	  width: '100%',
		        	  height: '100%',
		        	  layout: 'border',
		        	  defaults:{margins:'0 0 10 0'},
		        	  items: [
		  	                {
			                	id: 'fc_displaySqlOuter',
			                	title: 'Sql Query',
			                	hideMode: 'offsets',
			                	region: 'north',
			                	plugins: [Ext.ux.PanelCollapsedTitle],
			            		border:true,
			            		frame: true,
			            		hidden: true,
			            		collapsible: true,
			            		collapsed: true,
			            		height: 120,
		        	        	maxSize: 120,
		        	        	autoScroll: true,
		        	        	layout: 'anchor',
			                	items: [
			                	        {
			                	        	id: 'fc_displaySqlTime',
			                	        	xtype: 'displayfield',
			                	        	anchor: '100%'
			                	        },
			                	        {
			                	        	xtype: 'displayfield',
			                	        	anchor: '100%',
			                	        	style: 'margin-top: 10px;',
			                	        	value: 'Query:'
			                	        },
			                	        {
			                	        	id: 'fc_displaySql',
			                	        	xtype: 'displayfield',
			                	        	anchor: '100%'
			                	        },
			                	        {
			                	        	xtype: 'displayfield',
			                	        	anchor: '100%',
			                	        	style: 'margin-top: 10px;',
			                	        	value: 'Count Query:'
			                	        },
			                	        {
			                	        	id: 'fc_displayCountSql',
			                	        	xtype: 'displayfield',
			                	        	anchor: '100%'
			                	        }
			                	],
			                	listeners: { bodyresize: function(panel, width, height) { 
			                	    if(this.getHeight() > 160) 
			                	        this.setHeight(160);
			                	}}  
			                },
			                {
			                	region: 'center',
			                	hideMode: 'offsets',
			                	layout: 'fit',
			                	items: [
			                	        fc_buildResultsGrid(fc_params)
			                	]
			                }
		        	  ]
		        }
		]
	};
	
	return panel;
}



function fc_executeFormCheckSearch(fc_params) {
	var formPanel = fc_params.formPanel;
	if(formPanel)
	{	
		var msgMask = new Ext.LoadMask(Ext.getBody(), {msg:"Checking form...", removeMask: true});
		msgMask.show();
	
			formPanel.form.submit({
				clientValidation: true,
				method: 'GET',
				failure: function(form, action) { 
					msgMask.hide();
			       switch (action.failureType) {
			            case Ext.form.Action.CLIENT_INVALID:
			                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
			                break;
			            case Ext.form.Action.CONNECT_FAILURE:
			                Ext.Msg.alert('Failure', 'Ajax communication failed');
			                break;
			            case Ext.form.Action.SERVER_INVALID:
			            	createLongErrWin({title: 'Failure', msg: action.result.message});
			               break;
			            default:
			            	Ext.MessageBox.show({
			            		title   : 'Error',
			            		msg     : action.result.message,
			            		buttons : Ext.MessageBox.OK,
			            		icon    : Ext.MessageBox.ERROR
			            	});
			       }
				},
				success: function(form, action) {
					msgMask.hide();
					var searchPanel = Ext.getCmp('fc_outerUIPanel');
		    		var resultsPanel = Ext.getCmp('fc_resultsPanel');
		    		var backBtn = Ext.getCmp('fc_backToSearchBtn');
		    		var clearBtn = Ext.getCmp('fc_clearBtn');
		    		var searchBtn = Ext.getCmp('fc_searchBtn');
		    		var showSearchResultsBtn = Ext.getCmp('fc_showPrevSearchResultsBtn');
		    		searchPanel.hide();
		    		resultsPanel.show();
		    		clearBtn.hide();
		    		searchBtn.hide();
		    		backBtn.show();
		    		showSearchResultsBtn.hide();

					fc_startNewSearch(fc_params);
				},
				params: {
					screenname: fc_params.screenname,
					transactionType: 'search',
					login_id: gprops.get('ncisUser.login_id')
				},
				url : 'case/checkFindCaseValid.json'
			});
	}
}

Ext.apply(Ext.form.VTypes, {
	fc_dobChk: function(value, field)
	   {
			var currDate = new Date();
			var dobDate = Date.parseDate(value, 'd/m/Y', true);
			
			if(value != '08/08/8888' && value != '09/09/9999' && dobDate > currDate)
			{
				return false;
			}
			return true;
	   },
	   fc_dobChkText: 'You must enter a date of birth that is not greater than the current date'
	});
