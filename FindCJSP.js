/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/**
 * 
 * 
 * */
Ext.onReady(function() {
			var screenname = 'Tests with ExT JS';
			
			Ext.Loader.load([
			                 './findcase.js?ver=<%=request.getAttribute("ver")%>'
			],
			function() {
					/**
					 * 
					 */
					var innerContent = new FindCase(
//						{
//							permLevel: permLevel, isAdmin: permAdmin, screenname: 'find', saveMsg: saveMsg
//						}
							);
		    			var mainContentPanel = Ext.getCmp('mainContentPanel');
		    			if(mainContentPanel)
		    			{
		    				mainContentPanel.add(innerContent);
		    				mainContentPanel.doLayout();
		    			}	
					}, this, true);
				
					var titleCmp = Ext.getCmp('titleTbtext');
					if(titleCmp)
					{
						titleCmp.setValue('Find Case');
					}	

					
				});

