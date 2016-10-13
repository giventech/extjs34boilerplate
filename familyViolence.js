function cda_BuildUI(cdf_params) {
	cdf_params.cda_panel = new Ext.Panel({
		anchor: '100% 100%',
		autoScroll: false,
		border: false,
		frame: false, 
		items: [
		 //   cda_BuildAttendanceHistory(cdf_params),
		    cda_BuildFamilyViolence(cdf_params),
         //  cda_BuildPersonExamined(cdf_params),
		 //   cda_BuildNonPatient(cdf_params)
		],
		layout: 'form'
	});
	return cdf_params.cda_panel;
}

function cda_BuildAttendanceHistory(cdf_params) {
	cda_AttendanceHistoryFieldset = {
		width: '100%',	
		layout: 'column',
		style: 'margin:0px;padding:0px;',
		border: false,
		frame: false, 
		items: [
		 	{border: false, frame: false, columnWidth: 0.8, items: [cda_BuildAttendance(cdf_params)], style: 'margin-left:4px; padding-right:5px;'},
		 	{border: false, frame: false, columnWidth: 0.2, items: [cda_BuildHistory(cdf_params)], style: 'margin-right:2px;'}
		]
	};
	return cda_AttendanceHistoryFieldset;
}

function cda_BuildAttendance(cdf_params) {
	 cda_AttendanceFieldset = new Ext.form.FieldSet({
		anchor: '100% 100%', 
		defaults: {readOnly : false},
		layout: 'hbox',
		style: 'margin:0px;margin-bottom:0px; ',
		title: 'Attendance Details',
		items: [
				cda_BuildAttendanceFirstColumn(cdf_params),
				cda_BuildAttendanceSecondColumn(cdf_params)
		]
	});
	return cda_AttendanceFieldset;
}

function cda_BuildAttendanceFirstColumn(cdf_params) {
	
	
//	var consultTypeData =  [
//                 		       ['1', 'Clinical Examination'],
//                 		       ['2', 'Biological Specimens'],
//                 		       ['3', 'Expert opinion'],
//                 		       ['4', 'Court Appearance - Half Day'],
//                 		       ['5', 'Court Appearance - Full Day'],
//                 		       ['6', 'Phone Consultation'],
//                		       ['7', 'Other']
//             		       ];
             		       
	var cda_AttendanceFirstColumn = 
		new Ext.form.FieldSet({
				border: false,
	    		frame: false,
	    		flex:1,
	    		xtype:'fieldset',
				defaults: {readOnly : false},
				anchor: '100%',
				style: 'margin:0px;padding:0px;',
				items:  [
					    {
					    	xtype: 'displayfield',
					    	value:'',
					    	hidden: cdf_params.isAdmin,
					    	style: 'margin-top:9px;'
					    	
					    },
					    {
				    		anchor: '100%',
				    		border: false,
				    		frame: false,
				        	layout: 'hbox',
				        	defaults: {
				        		margins:'0 5 10 0',
				        	},
				        	hidden: cdf_params.isAdmin,
				        	readOnly: cdf_params.isAdmin,
				        	items: 		[
										{
									    	id: 'cda_icmsCaseNo',
									    	name: 'icmsCaseNo',
									    	readOnly: cdf_params.isAdmin,
									    	xtype: 'hidden'
									    },
							        	{
				 					    	name: 'transfer.transferId',
				 					    	xtype: 'hidden'
				 					    },
							        	{
							    			name: 'cdtCheckComplete',
							    			style: 'padding:0px;margin:0px;',
							    			hidden:true,
							    			columns: 'auto',
							    			readOnly: cdf_params.isAdmin,
							    			submitValue: !cdf_params.isAdmin,
							    			xtype: 'checkboxgroup',
							    			items: 	[
								    	   			 {
										    			name: 'transfer.checkComplete'
								    	   			 },
								    	   			 {
										    			name: 'transfer.searchComplete'
								    	   			 },
								    	   			 {
										    			name: 'transfer.documentsRecieved'
								    	   			 }
								    	   			]
						    			},
							        	{
									    	name: 'transfer.icmsCaseNo',
									    	readOnly: cdf_params.isAdmin,
									    	submitValue: !cdf_params.isAdmin,
									    	xtype: 'hidden'
									    },
							        	{
									    	name: 'transfer.cfmNotes',
									    	id:'cda_cfmNotes',
									    	readOnly: cdf_params.isAdmin,
									    	submitValue: !cdf_params.isAdmin,
									    	xtype: 'hidden'
									    },
							    	    {
 									    	name: 'createdBy',
									    	xtype: 'hidden'
									    },
									    {
									    	name: 'updatedBy',
									    	xtype: 'hidden'
									    },
									    {
									    	name: 'transferedBy',
									    	xtype: 'hidden'
									    },
									    {
									    	name: 'linksAvailable', xtype: 'hidden'
									    },
									    {
									    	name: 'imagesAvailable', xtype: 'hidden'
									    },
				        	    	    {
				        	    	    	id: 'cda_timestamp',
				        	    	    	name: 'timestamp',
				        	    	    	hidden: true,
				        	    	    	xtype: 'textfield'
				        	    	    }

							]
					    },
						{
				    		anchor: '100%',
				    		border: false,
				    		frame: false,
				        	layout: 'hbox',
				        	defaults: {
				        		margins:'0 5 10 0',
				        	},
				        	hidden: !cdf_params.isAdmin,
				        	items: 		[
				        				{
											id: 'cdaMandtryFo',
											style: 'margin-left:0px;margin-right:0px;',
											//hidden: true,
											value: '*',
											width: 4,
											xtype: 'mandatorydisplayfield'
										},
					        			{
							    	    	value: 'CFP:',
							    	    	width: 105,
							    	    	xtype: 'displayfield'
							    	    },
										{
								        	xtype: 'combo',
								        	hiddenName: 'foId',
								        	id: 'cdaFoList',
								        	mandatoryCmpId:'cdaMandtryFo', 
								        	forceSelection: true,
											triggerAction: 'all',
								        	editable : true,
								        	displayField: 'displayx',
								        	typeAhead: true,
								        	allowBlank: !cdf_params.isAdmin,
								        	mode: 'local',
								        	store:new Ext.data.JsonStore({
								        		fields: [
									        		         {
									        		         	name: 'userId', 
									        		         	mapping : 'userId', 
									        		         	type : 'int'
									        		         },
									        		         {
									        		         	name: 'givenName'
									        		         },
									        		         {
									        		         	name: 'surname'
									        		         },
									        		         {
									        		         	name: 'displayx', mapping: 'surname + ", " + obj.givenName'
									        		         },
									        		         {
									        		        	 name: 'webRoles', mapping: 'webRoles'
									        		         },
									        		         {
									        		        	 name: 'localityId', mapping : 'localityId',type : 'int'
									        		         }
								        		         ],
								        		         listeners: {
								        		        	'load': function(store, records, options) {
								      		        			store.insert(0, new Ext.data.Record({userId: 0, displayx: ''}));
								      		        			store.sort('surname', 'ASC');
								        		        	 }
								        		         },
								        		         idProperty: 'userId',
								        		         root: 'foList'
								        	}),
								        	tpl: '<tpl for="."><div ext:qtip="Surname,&nbsp; First Name" class="x-combo-list-item">{displayx}&nbsp;</div></tpl>',
								        	valueField: 'userId',
											flex: 1,
											listeners: {
					        		        	 'combochangeval': function(combo, oldIndexVal, newTextVal, newIndexVal) {
						      		        			var currVal = combo.getValue();
														var rec = combo.store.getById(currVal);
														if(rec)
														{
															cdf_setFoUserRolesAndParams(cdf_params, rec);
															cda_reloadRollStore(cdf_params);
														}
					        		        	 }
											},
								        	tabIndex: 1
								        }
								        ]
					    	},
					    	{
					        	anchor: '100%',
					    		border: false,
					    		frame: false,
					        	layout: 'hbox',
					        	defaults: {
					        		margins:'3 5 10 0',
					        	},
						        items: 	[
							    	    {
											id: 'cdaMandtryServiceDate',
											style: 'margin-left:0px;margin-right:0px;',
											value: '*',
											width: 4,
											xtype: 'mandatorydisplayfield'
										},
					        			{
							    	    	value: 'Date of Service:',
							    	    	width: 105,
							    	    	xtype: 'displayfield'
							    	    },
										{
							    	    	id: 'cdaServiceDateId',
							    	    	name: 'serviceDate',
									    	xtype: 'xdatefield',
								        	mandatoryCmpId:'cdaMandtryServiceDate', 
											//submitFormat: 'm/d/Y',
								        	submitFormat: 'm/d/Y H:i:s',
											width: 100,
								        	mandatory: true,
									    	allowBlank: false,
									    	strict: true,
									    	maxValue: new Date(),
									    	blankText: 'Please enter a date of service',
											format: 'd/m/Y',
											invalidText: 'Please enter a date of service',
											listeners: {
												'afterrender' : function(cda_panel) {
									 				var dfield = cdf_params.cdf_formpanel.form.findField('serviceDate');
									 				var newValue = dfield.getValue();
													var valid = cds_CheckFutureService(cdf_params, newValue);
								 						if(valid){ 
															cdf_params.serviceDate = newValue;
									 						cds_InitServiceDate(cdf_params);
										    				var tfieldVal = cdf_params.cdf_formpanel.form.findField('frmTravelCommenced').getValue();
		 								    				var xfield = null;
		 								    				var xfieldDt = Ext.getCmp('cdsTravelCommencedDateTime');
											    			if(tfieldVal == null || tfieldVal == ''){
									 							xfieldDt.loadValueWithTrackFormReset(newValue);
										 					}else{
										 						cdsSetXDateTime(cdf_params, xfield, xfieldDt, dfield.getRawValue(), tfieldVal);
										 					}
								 						}
						    					 },
												'change' : function(field, newValue, oldValue) {
							 						var valid = cds_CheckFutureService(cdf_params, newValue);
							 						if(valid){ 
														cdf_params.serviceDate = newValue;
								 						cds_InitServiceDate(cdf_params);
								 						var dfield = cdf_params.cdf_formpanel.form.findField('serviceDate');
									    				var tfieldVal = cdf_params.cdf_formpanel.form.findField('frmTravelCommenced').getValue();
	 								    				var xfield = null;
	 								    				var xfieldDt = Ext.getCmp('cdsTravelCommencedDateTime');
										    			if(Ext.isEmpty(tfieldVal)){
									 					}else{
									 						cdsSetXDateTime(cdf_params, xfield, xfieldDt, dfield.getRawValue(), tfieldVal);
									 					}
									 						var tfieldVal1 = cdf_params.cdf_formpanel.form.findField('frmCaseArrived').getValue();
		 								    				var xfield1 = null;
		 								    				var xfieldDt1 = Ext.getCmp('cdsCaseArrivedDateTime');
											    			if(Ext.isEmpty(tfieldVal1)){
										 					}else{
								    							cdsSetXDateTime(cdf_params, xfield1, xfieldDt1, dfield.getRawValue(), tfieldVal1);
										 					}
										    				var tfieldVal2 = cdf_params.cdf_formpanel.form.findField('frmCaseCommenced').getValue();
		 								    				var xfield2 = null;
		 								    				var xfieldDt2 = Ext.getCmp('cdsCaseCommencedDateTime');
											    			if(Ext.isEmpty(tfieldVal2)){
										 					}else{
								    							cdsSetXDateTime(cdf_params, xfield2, xfieldDt2, dfield.getRawValue(), tfieldVal2);
										 					}
										    				var tfieldVal3 = cdf_params.cdf_formpanel.form.findField('frmCaseConcluded').getValue();
		 								    				var xfield3 = null;
		 								    				var xfieldDt3 = Ext.getCmp('cdsCaseConcludedDateTime');
											    			if(Ext.isEmpty(tfieldVal3)){
										 					}else{
								    							cdsSetXDateTime(cdf_params, xfield3, xfieldDt3, dfield.getRawValue(), tfieldVal3);
										 					}
										    				var tfieldVal4 = cdf_params.cdf_formpanel.form.findField('frmTravelConcluded').getValue();
		 								    				var xfield4 = null;
		 								    				var xfieldDt = Ext.getCmp('cdsTravelConcludedDateTime');
											    			if(Ext.isEmpty(tfieldVal4)){
										 					}else{
								    							cdsSetXDateTime(cdf_params, xfield4, xfieldDt, dfield.getRawValue(), tfieldVal4);
										 					}
											    			
											    			
											    			//validate
											    			var callReceivedDateCmp = cdf_params.cdf_formpanel.form.findField('cdsCallReceivedDate');
											    			callReceivedDateCmp.validate();
											    			callReceivedDateCmp.isValid();

											    			var callReceivedTimeCmp = cdf_params.cdf_formpanel.form.findField('frmCallReceivedTime');
											    			callReceivedTimeCmp.validate();
											    			callReceivedTimeCmp.isValid();

											    			cda_ActionCallOutType(cdf_params);
							 						}
												},
												'changeval': function(field, oldValue, newValue, newIndxVal)
												{
													var cmp = Ext.getCmp('cfc_feeMainPanel');
													if(cmp && newValue != null)
													{
														var date = Date.parseDate(newValue, 'd/m/Y');
														if(Ext.isDate(date))
														{
															var dateStr = date.format('d/m/Y H:i:s');
															cmp.store.load({ 
																params: { 
																	currentUserId: dprops.get('currentUserId'),
																	currUserIdentifier: dprops.get('currUserIdentifier'),
																	delegateWebUserId: dprops.get('delegateWebUser.userId'),
																	date: dateStr
																} 
															});
														}	
													}	
												},
												'select' : function(field, date) {
							 						var valid = cds_CheckFutureService(cdf_params, date);
							 						if(valid){ 
														cdf_params.serviceDate = date;
								 						cds_InitServiceDate(cdf_params);
								 						var tfieldVal = cdf_params.cdf_formpanel.form.findField('frmTravelCommenced').getValue();
							 							var xfield = null;
							 							var xfieldDt = Ext.getCmp('cdsTravelCommencedDateTime');
							 							var dfield = cdf_params.cdf_formpanel.form.findField('serviceDate');
								 						if(Ext.isEmpty(tfieldVal)){
								 						}else{
								 							cdsSetXDateTime(cdf_params, xfield, xfieldDt, dfield.getRawValue(), tfieldVal);
								 						}

								 						var tfieldVal1 = cdf_params.cdf_formpanel.form.findField('frmCaseArrived').getValue();
	 								    				var xfield1 = null;
	 								    				var xfieldDt1 = Ext.getCmp('cdsCaseArrivedDateTime');
										    			if(Ext.isEmpty(tfieldVal1)){
									 					}else{
							    							cdsSetXDateTime(cdf_params, xfield1, xfieldDt1, dfield.getRawValue(), tfieldVal1);
									 					}
									    				var tfieldVal2 = cdf_params.cdf_formpanel.form.findField('frmCaseCommenced').getValue();
	 								    				var xfield2 = null;
	 								    				var xfieldDt2 = Ext.getCmp('cdsCaseCommencedDateTime');
										    			if(Ext.isEmpty(tfieldVal2)){
									 					}else{
							    							cdsSetXDateTime(cdf_params, xfield2, xfieldDt2, dfield.getRawValue(), tfieldVal2);
									 					}
									    				var tfieldVal3 = cdf_params.cdf_formpanel.form.findField('frmCaseConcluded').getValue();
									    				var xfield3 = null;
	 								    				var xfieldDt3 = Ext.getCmp('cdsCaseConcludedDateTime');
										    			if(Ext.isEmpty(tfieldVal3)){
									 					}else{
							    							cdsSetXDateTime(cdf_params, xfield3, xfieldDt3, dfield.getRawValue(), tfieldVal3);
									 					}
									    				var tfieldVal4 = cdf_params.cdf_formpanel.form.findField('frmTravelConcluded').getValue();
	 								    				var xfield4 = null;
	 								    				var xfieldDt = Ext.getCmp('cdsTravelConcludedDateTime');
										    			if(Ext.isEmpty(tfieldVal4)){
									 					}else{
							    							cdsSetXDateTime(cdf_params, xfield4, xfieldDt, dfield.getRawValue(), tfieldVal4);
									 					}

										    			//validate
										    			var callReceivedDateCmp = cdf_params.cdf_formpanel.form.findField('cdsCallReceivedDate');
										    			callReceivedDateCmp.validate();
										    			callReceivedDateCmp.isValid();

										    			var callReceivedTimeCmp = cdf_params.cdf_formpanel.form.findField('frmCallReceivedTime');
										    			callReceivedTimeCmp.validate();
										    			callReceivedTimeCmp.isValid();

										    			cda_ActionCallOutType(cdf_params);
							 						}
							 						
												}
											},
											tabIndex: 2
									    },
									    {
							    	    	width: 10,
							    	    	xtype: 'spacer'
								    	},
								    	{
											id: 'cdaMandtryMyRole',
											style: 'margin-left:0px;margin-right:0px;',
											value: '*',
											width: 4,
											xtype: 'mandatorydisplayfield'
										},
									    {
							    	    	value: 'My Role:',
							    	    	width: 51,
							    	    	xtype: 'displayfield'
								    	},
									    {
								    		id: 'cdaRoleId',
											hiddenName: 'roleId',
								        	mandatoryCmpId:'cdaMandtryMyRole', 
								        	xtype: 'combo',
											forceSelection: true,
											displayField: 'descShort',
											triggerAction: 'all',
											mandatory: true,
											allowBlank: false,
											editable : true,
											invalidText: 'Please enter a role',
											typeAhead: true,
											mode: 'local',
											blankText: 'You must make a CFP selection first.',
											store: new Ext.data.JsonStore({
									    		fields: [
									    		           {
												    	    	name : 'roleId',
												    	    	mapping : 'webRole.id',
												    	    	type : 'int'
												    	    },
									    		            {
												    	    	name : 'roleCode',
												    	    	mapping : 'webRole.role_code'
												    	    },
												    	    {
												    	    	name    : 'descShort',
												    	    	mapping : 'webRole.role_desc_short'
												    	    },
												    	    {
												    	    	name	: 'descLong',
												    	    	mapping : 'webRole.role_description'
												    	    }
									    		         ],
									    		         listeners: {
									    		        	 'load': function(store, records, options) {
									    		        			cda_filterRollStore(cdf_params);
									    		        	 }
									    		         },
									    		         idProperty: 'roleId',
									    		         root: 'myrolelist'
									    	}),
									    	tpl: '<tpl for="."><div ext:qtip="{descLong}" class="x-combo-list-item">{descShort}</div></tpl>',
									    	valueField: 'roleId',
									    	listeners: {
												'select': function(store, record, options) {
														cdf_params.myRole=record.get('roleCode');
														cdf_params.caseRoleId=record.get('roleId');
											     },
									    		'combochangeval': function(field, oldIndxVal, newValue, newIndxVal)
									    		{
									    			if(newIndxVal == null || newIndxVal < 1)
									    			{
														cdf_params.myRole='';
														cdf_params.caseRoleId=0;
									    			}
									    			else
									    			{	
										    			var record = field.store.getById(newIndxVal);
														cdf_params.myRole=record.get('roleCode');
														cdf_params.caseRoleId=record.get('roleId');
									    			}	
									    			cda_actionRoleChange(cdf_params);
									    			var reportTypeIdVal = cdf_params.cdf_formpanel.form.findField('service.reportTypeId').getValue();
									    			
									    			if(reportTypeIdVal == 1 || reportTypeIdVal == 2){
									    				cds_filterReportTemplates(cdf_params);
									    			}
									    		}

											},
											flex: 1,
									    	tabIndex: 3
									           
										}
								    ]
					    },
					    {
				        	anchor: '100%',
				    		border: false,
				    		frame: false,
				        	layout: 'hbox',
				        	defaults: {
				        		margins:'0 5 10 0',
				        	},
					        items: 	[
						    	    {
										id: 'cdaMandtryCallOutType',
										style: 'margin-left:0px;margin-right:0px;',
										value: '*',
										width: 4,
										xtype: 'mandatorydisplayfield'
									},
					       			{
						    	    	value: 'Call Out Type:',
						    	    	width: 105,
						    	    	xtype: 'displayfield'
						    	    },
									{	
							        	hiddenName: 'incidentType',
										xtype: 'combo',
							        	id: 'cdaCallOutType',
							        	mandatoryCmpId:'cdaMandtryCallOutType', 
							        	forceSelection: true,
										triggerAction: 'all',
										mandatory: true,
										allowBlank: false,
							        	editable : true,
							        	displayField: 'description',
							        	typeAhead: true,
							        	fieldLabel: 'Call Out Type',
							        	autoSelect : true,
							        	enableKeyEvents : true,
							        	//selectOnFocus: true,
							        	blankText: 'You must make a My Role selection first.',
							        	mode: 'local',
							        	store: new Ext.data.JsonStore({
							        		pruneModifiedRecords: true,
							        		fields: [
							        		         {name: 'header'},
							        		         {name: 'position', direction: 'ASC' },
							        		         {name: 'description'}
					        		         ],
					        		         listeners: {
					        		        	 'load': function(store, records, options) {
			        		        				cda_filterCallOutStore(cdf_params, store, records, options);
			        		        				
//			        		        				
//			        		        				var output = '';
//			        		        				store.each(function(rec){
//			        		        					var data = rec.data;
//			        		        					var output1 = '';
//			        		        					for (property in data) {
//			        		        					  output1 += property + ': ' +data[property]+'; ';
//			        		        					}
//			        		        					output += '[' + output1 + ']';
//			        		        				});
//			        		        				console.log('incidentType = '+output);
//
			        		        				
					        		        	 }
					        		         },
					        		         root: 'incidentList'
							        	}),
							        	tpl: '<tpl for="."><div ext:qtip="{description}" class="x-combo-list-item">{description}&nbsp;</div></tpl>',
							        	valueField: 'description',
										listeners: {
											afterrender: function(combo) {
												combo.keyNav.esc = function(e) {  // Override ESC handling function
												    this.collapse();                // Standard behaviour of Ext's ComboBox.
												    this.setValue(this.startValue); // We reset to starting value on ESC
												};
												combo.keyNav.tab = function() {   // Override TAB handling function
												    this.onViewClick(false);        // Select the currently highlighted row
												    this.collapse();                // Standard behaviour of Ext's ComboBox.
												};
											 },
				        		        	 'combochangeval': function(combo, oldIndexVal, newTextVal, newIndexVal) {
					      		        			var currVal = combo.getValue();

													var indx = combo.store.find('description',currVal, 0, false, false);
													if(indx > -1){
														var rec = combo.store.getAt(indx);
														if(rec)
														{
											    			cda_GetPopulatedOtherDetailsList(cdf_params);
											    			cda_ActionCallOutType(cdf_params);
											    			
											    			var reportRequiredCmp = cdf_params.cdf_formpanel.form.findField('service.reportTypeId');
									    					if (reportRequiredCmp && !Ext.isEmpty(reportRequiredCmp.getValue())){
											    					var reportRequiredVal = reportRequiredCmp.getValue();
													    			if( reportRequiredVal != 0 && reportRequiredVal != 3){
													    				cdf_params.cdf_formpanel.form.findField('callOutTypeId').loadValueWithTrackFormReset('Call Out Type: '+combo.getValue());
													    			}
									    					}
															
														}
													}
				        		        	 }
										},
//										listeners: {
//											'select': function(combo, record, index) {
//										    			cda_GetPopulatedOtherDetailsList(cdf_params);
//										    			cda_ActionCallOutType(cdf_params);
//										    			
//										    			var reportRequiredCmp = cdf_params.cdf_formpanel.form.findField('service.reportTypeId');
//								    					if (reportRequiredCmp && !Ext.isEmpty(reportRequiredCmp.getValue())){
//										    					var reportRequiredVal = reportRequiredCmp.getValue();
//												    			if( reportRequiredVal != 0 && reportRequiredVal != 3){
//												    				cdf_params.cdf_formpanel.form.findField('callOutTypeId').loadValueWithTrackFormReset('Call Out Type: '+combo.getValue());
//												    			}
//								    					}
//
//										     }
//										},
										flex: 1,
							        	tabIndex: 4
								    }
							]
					     },
					     {
				        	anchor: '100%',
				    		border: false,
				    		frame: false,
				        	layout: 'hbox',
				        	defaults: {
				        		margins:'0 5 10 0',
				        	},
					        items: 	[
						    	    {
										id: 'cdaMandtryConsultationType',
										style: 'margin-left:0px;margin-right:0px;',
										value: '*',
										width: 4,
										xtype: 'mandatorydisplayfield'
									},
					       			{
						    	    	value: 'Consultation Type:',
						    	    	width: 105,
						    	    	xtype: 'displayfield'
						    	    },
								    {
						    	    	id: 'cdaConsultType',
							        	hiddenName: 'consultType',
							        	mandatoryCmpId:'cdaMandtryConsultationType', 
								    	xtype: 'combo',
							        	forceSelection: true,
										triggerAction: 'all',
							        	editable : true,
							        	displayField: 'description',
							        	typeAhead: true,
							        	mandatory: true,
							        	allowBlank: false,
							        	blankText: 'You must make a My Role selection first.',
							        	mode: 'local',
//							        	store:new Ext.data.SimpleStore({
//							        		idProperty: 'id',
//				                    		fields: ['id', 'description'],
//				                    		data:  consultTypeData,
//				                    		listeners: {
//						    		        	 'load': function(store, records, options) {
//						    		        	 	}
//							    		        }
//			                    		}),
							        	store: new Ext.data.JsonStore({
							        		pruneModifiedRecords: true,
							        		fields: [
							        		         {name: 'header'},
							        		         {name: 'position', direction: 'ASC' },
							        		         {name: 'description'}
							        		         ],
							        		         listeners: {
							        		        	 'load': function(store, records, options) {
					        		        				cda_filterConsultTypeStore(cdf_params, store, records, options);
							        		        	 }
							        		         },
							        		         root: 'consultList'
							        	}),
							        	tpl: '<tpl for="."><div ext:qtip="{description}" class="x-combo-list-item">{description}&nbsp;</div></tpl>',
							        	valueField: 'description',
										listeners: {
											'select': function(combo, record, index) {
										    			cda_GetPopulatedOtherDetailsList(cdf_params);
										    			cda_ActionConsultType(cdf_params);
										    			cda_ActionCallOutType(cdf_params);
										     },
								    		'combochangeval': function(field, oldIndxVal, newValue, newIndxVal)
								    		{
								    			cfc_calculateFeeCourt(cdf_params);
								    		}
										},
										flex: 1,
							        	tabIndex: 5
								    }
								]
					    },
					    {
					    	xtype: 'displayfield',
					    	value:'',
					    	hidden: cdf_params.isAdmin,
					    	style: 'margin-bottom:8px;'
					    	
					    }
						
					]
		
		});
	return cda_AttendanceFirstColumn;
}


function cda_BuildAttendanceSecondColumn(cdf_params) {
	var cda_AttendanceSecondColumn = new Ext.form.FieldSet({
											border: false,
								    		frame: false,
								    		flex:1,
								    		xtype:'fieldset',
											layout: 'anchor',
											style: 'padding:1px;margin-top:60px',
											anchor: 'bottom',
											items:  [
													  {
											        	anchor: '100%',
											    		border: false,
											    		frame: false,
											        	layout: 'hbox',
											        	defaults: {
											        		margins:'0 5 5 0',
											        	},
												        items: 	[
												        		{
																	name: 'cdaMandtryOtherDetails',
																	style: 'margin-left:0px;margin-right:0px;',
																	value: ' ',
																	width: 4,
																	xtype: 'mandatorydisplayfield'
																},
												        		{
													    	    	value: 'Other Details:',
													    	    	width: 77,
													    	    	xtype: 'displayfield'
													    	    },
													    	    {
															    	name: 'otherDetails',
														        	mandatoryCmpId:'cdaMandtryOtherDetails', 
															    	xtype: 'textarea',
															    	allowBlank: true,
													            	readOnly: true,
																	flex: 1,
																	maxLength: 150,
				    												maxLengthText: "The maximum length for this field is {0}",
																	autoHeight:true,
																	autoCreate: {tag: 'textarea', type: 'text', maxlength: '150'},
															    	style: 'margin-left:0px; margin-bottom: 0px',
															    	tabIndex: 6
															    }
														]
													}
												]
											});
	return cda_AttendanceSecondColumn;
}

function cda_BuildHistory(cdf_params) {
	var cda_HistoryFieldset = 
					new Ext.form.FieldSet({
							layout: 'anchor', 
		    			    style: 'margin-left:4px;',
							title: 'Record History',
							items:   [
									 {
							        	anchor: '100%',
							    		border: false,
							    		frame: false,
							        	layout: 'hbox',
							        	defaults: {
							        		margins:'0 5 5 0',
							        	},
								        items: 	[
								        		{
									    	    	value: 'iCFM #:',
									    	    	width: 90,
									    	    	xtype: 'displayfield'
									    	    },
									    	    {
											    	name: 'caseId',
											    	xtype: 'textfield',
									            	value:' ',
									            	style: 'border:0;background: #ffffff;padding: 0;',
													width: 82
											    }
											]
									  },
									  {
							        	anchor: '100%',
							    		border: false,
							    		frame: false,
							        	layout: 'hbox',
							        	defaults: {
							        		margins:'0 5 5 0',
							        	},
								        items: 	[
								        		{
									    	    	value: 'Created Date:',
									    	    	width: 90,
									    	    	xtype: 'displayfield'
									    	    },
									    	    {
											    	name: 'createdDt',
											    	xtype: 'displayfield',
									            	value:' ',
													width: 100
											    }
											]
										},
									    {
								        	anchor: '100%',
								    		border: false,
								    		frame: false,
								        	layout: 'hbox',
								        	defaults: {
								        		margins:'0 5 5 0',
								        	},
									        items: 	[
									        		{
										    	    	value: 'Created By:',
										    	    	width: 90,
										    	    	xtype: 'displayfield'
										    	    },
										    	    {
			 									    	id: 'cda_createdBy',
												    	xtype: 'displayfield',
										            	value:' ',
														width: 100
												    }
										    ]
										},
									    {
								        	anchor: '100%',
								    		border: false,
								    		frame: false,
								        	layout: 'hbox',
								        	defaults: {
								        		margins:'0 5 5 0',
								        	},
									        items: 	[
									        		{
										    	    	value: 'Transferred Dt:',
										    	    	width: 90,
										    	    	xtype: 'displayfield'
										    	    },
										    	    {
 												    	name: 'transferedDt',
												    	xtype: 'displayfield',
										            	value:' ',
														width: 100,
												    } 
											]
										},
									    {
								        	anchor: '100%',
								    		border: false,
								    		frame: false,
								        	layout: 'hbox',
								        	defaults: {
								        		margins:'0 5 5 0',
								        	},
									        items: 	[
									        		{
										    	    	value: 'Modified Date:',
										    	    	width: 90,
										    	    	xtype: 'displayfield'
										    	    },
										    	    {
			 									    	name: 'updatedDt',
												    	xtype: 'displayfield',
				 										width: 100,
												    } 
											]
									 	},
										{
								        	anchor: '100%',
								    		border: false,
								    		frame: false,
								        	layout: 'hbox',
								        	defaults: {
								        		margins:'0 5 3 0',
								        	},
									        items: 	[
									        		{
										    	    	value: 'Modified By:',
										    	    	width: 90,
										    	    	xtype: 'displayfield'
										    	    },
										    	    {
			 									    	id: 'cda_updatedBy',
												    	xtype: 'displayfield',
										            	value:' ',
				 										width: 100,
												    } 
											]
										}
								]
					
						});
		return cda_HistoryFieldset;
}

function cda_BuildFamilyViolence(cdf_params) {
	var cda_FamilyViolenceFieldset = 
			new Ext.form.FieldSet({
				defaults: {readOnly : false},
				layout: 'anchor',
				anchor: '100%',
				style: 'margin:4px; margin-top:0px;',
				title: 'Family Violence',
				items: [
						cda_BuildFamilyViolenceFirstRow(cdf_params),
						cda_BuildFamilyViolenceSecondRow(cdf_params),
						cda_BuildFamilyViolenceThirdRow(cdf_params),
						cda_BuildFamilyViolenceFourthRow(cdf_params),
						cda_BuildFamilyViolenceLastRow(cdf_params)
				    ]
			});
	return cda_FamilyViolenceFieldset;
}



function cda_BuildFamilyViolenceFirstRow(cdf_params) {

	cda_FamilyViolenceFirstRowFieldset = 
			new Ext.form.FieldSet({
				layout: 'hbox',
				border: false,
				frame: false,
				style: 'padding:0px;',
				defaults: {
		    		margins:'0 5 0 0',
		    	},
				items:  [
				        {
								id: 'cdaMandtryFamily',
								style: 'margin-left:0px;margin-right:0px;',
								value: '*',
								width: 4,
								xtype: 'mandatorydisplayfield'
						},
						{
				    	    	value: 'Is this Family Violence Case ?',
				    	    	width: 175,
				    	    	xtype: 'displayfield'
				    	},
					    {
					    	id: 'cda_family_violence_case',
			    	    	name: 'familyViolence',
				        	mandatoryCmpId:'cdaMandtryFamily', 
					    	xtype: 'radiogroup',
					    	allowBlank: false,
					    	disabled: true,
					    	blankText: 'Please select a gender',
					    	columns: 'auto',
					    	fieldLabel: 'Is this Family Violence Case ?',
					    	invalidText: 'Please indicate if this is a family violence case',
					    	width: 120,
					    	items: [
						    	    {
						    	    	name: 'familyViolence',
						    	    	boxLabel: 'Y',
						    	    	inputValue: 'Y',
					    				tabIndex: 14
						    	    },
						    	    {
						    	    	name: 'familyViolence',
						    	    	boxLabel: 'N',
						    	    	inputValue: 'N',
					    				tabIndex: 15
						    	   }
						    ]
   					  }
   				]
				
			});
	return cda_FamilyViolenceFirstRowFieldset;
}
function cda_BuildFamilyViolenceSecondRow(cdf_params) {
	cda_FamilyViolenceSecondtRowFieldset = new Ext.form.FieldSet({
		layout: 'hbox',
				border: false,
				frame: false,
				style: 'padding:0px; ',
				defaults: {
		    		margins:'0 5 0 0'
		    	},		
		items:  [
			    {
	    			name: 'intimatePartner',
	    			id: 'cdaNonIntimatePartner',
	    			xtype: 'checkbox',
	    			disabled: true,
	    			boxLabel: 'Intimate Partner',
	    			margins: '0 30 0 0',
	    			clearField: function() {
	    				this.loadValueWithTrackFormReset(false);
	    				// Include validation rules there
	    				//cda_setPopulatedNonPatientRelatedConfig(cdf_params);
	    			},
	    			handler: function() {
	    				//cda_setPopulatedNonPatientRelatedConfig(cdf_params);
	    			},
					tabIndex: 16
			    }
			   /* ,{
					id: 'cdaNonIntimatePartner',
					style: 'margin-left:0px;margin-right:0px;',
					value: ' ',
					width: 4,
					xtype: 'mandatorydisplayfield'
				}*/
				
    	    	]
	});
	return cda_FamilyViolenceSecondtRowFieldset;
}



function cda_BuildFamilyViolenceThirdRow(cdf_params) {
	cda_FamilyViolenceThirdRowFieldset = new Ext.form.FieldSet({
		layout: 'hbox',
				border: false,
				frame: false,
				style: 'padding:0px; ',
				defaults: {
		    		margins:'0 5 0 0'
		    	},		
		items:  [
			     {
	    			name: 'parentChild',
	    			id: 'cdaParentChild',
	    			xtype: 'checkbox',
	    			disabled: true,
	    			boxLabel: 'Parent-Child',
	    			margins: '0 30 0 0',
	    			clearField: function() {
	    				this.loadValueWithTrackFormReset(false);
	    				// Include validation rules there
	    				//cda_setPopulatedNonPatientRelatedConfig(cdf_params);
	    			},
	    			handler: function() {
	    				//cda_setPopulatedNonPatientRelatedConfig(cdf_params);
	    			},
					tabIndex: 16
			    }
			  /* , {
					id: 'cdaParentChild',
					style: 'margin-left:0px;margin-right:0px;',
					value: ' ',
					width: 4,
					xtype: 'mandatorydisplayfield'
				}*/
				
    	    	]
	});
	return cda_FamilyViolenceThirdRowFieldset;
}

function cda_BuildFamilyViolenceFourthRow(cdf_params) {
	cda_FamilyViolenceFourthRowFieldset = new Ext.form.FieldSet({
		layout: 'hbox',
				border: false,
				frame: false,
				style: 'padding:0px; ',
				defaults: {
		    		margins:'0 5 0 0'
		    	},		
		items:  [
			   /* {
			    	name: 'familyViolence.familyVId',
			    	xtype: 'hidden'
			    },*/
			    {
	    			name: 'other',
	    			id: 'cdaNonOtherIntimateOrFamilial',
	    			xtype: 'checkbox',
	    			boxLabel: 'Other intimate or familial (detail in notes)',
	    			margins: '0 30 0 0',
	    			clearField: function() {
	    				this.loadValueWithTrackFormReset(false);
	    				// Include validation rules there
	    				//cda_setPopulatedNonPatientRelatedConfig(cdf_params);
	    			},
	    			handler: function() {
	    				//cda_setPopulatedNonPatientRelatedConfig(cdf_params);
	    			},
					tabIndex: 16
			    }
			 /* ,{
					id: 'cdaNonIntimatePartner',
					style: 'margin-left:0px;margin-right:0px;',
					value: ' ',
					width: 4,
					xtype: 'mandatorydisplayfield'
				}*/
				
    	    	]
	});
	return cda_FamilyViolenceFourthRowFieldset;
}


function cda_BuildFamilyViolenceLastRow(cdf_params) {
	cda_FamilyViolenceLastRowFieldset = new Ext.form.FieldSet({
		layout: 'hbox',
				border: false,
				frame: false,
				style: 'padding:0px; ',
				defaults: {
		    		margins:'0 5 0 0'
		    	},		
		items:  [
			   	{
	    	    	value: 'Notes:',
	    	    	width: 125,
	    	    	xtype: 'displayfield'
	    	    },
			    {
			    	name: 'notes',
		        	mandatoryCmpId:'cdaMandtryNotes', 
			    	xtype: 'textarea',
			    	readOnly: false,
			    	fieldLabel: 'Notes',
			    	maxLength : 150, 
			    	enforceMaxLength: true,
			    	flex: 2,
			    	height: 75,
					tabIndex: 17
			    },
			   /* {
					id: 'cdaMandtryNotes',
					style: 'margin-left:0px;margin-right:0px;',
					value: ' ',
					width: 4,
					xtype: 'mandatorydisplayfield'
				}*/
    	    	]
	});
	return cda_FamilyViolenceLastRowFieldset;
}




function cda_BuildPersonExamined(cdf_params) {
	var cda_PersonExaminedFieldset = 
			new Ext.form.FieldSet({
				defaults: {readOnly : false},
				layout: 'anchor',
				anchor: '100%',
				style: 'margin:4px; margin-top:0px;',
				title: 'Details of Person Examined',
				items: [
						cda_BuildPersonFirstRow(cdf_params),
						cda_BuildPersonSecondRow(cdf_params),
						cda_BuildPersonThirdRow(cdf_params)
				    ]
			});
	return cda_PersonExaminedFieldset;
}

function cda_BuildPersonFirstRow(cdf_params) {
	var cda_PersonFirstRowFieldset = 
			new Ext.form.FieldSet({
				layout: 'hbox',
				border: false,
				frame: false,
				style: 'padding:0px;',
				defaults: {
		    		margins:'0 5 5 0',
		    	},
				items:   [
					     {
					    	name: 'patient.patientId',
					    	xtype: 'hidden'
					     },
					     {
							id: 'cdaMandtrySurname',
							style: 'margin-left:0px;margin-right:0px;',
							value: '*',
							width: 4,
							xtype: 'mandatorydisplayfield'
						},
						{
			    	    	value: 'Surname:',
			    	    	width: 75,
			    	    	xtype: 'displayfield'
			    	    },
					    {
					    	name: 'patient.surname',
				        	mandatoryCmpId:'cdaMandtrySurname', 
					    	xtype: 'textfield',
					    	autoCreate: {tag: 'input', type: 'text', size: '50', autocomplete: 'off', maxlength: '50'},
					    	maxLength: 50,
			  		    	allowBlank: false,
					    	flex: 1,
					    	blankText: 'Please enter a surname',
					    	invalidText : 'Please enter a surname',
					    	tabIndex: 7
					    },
					    {
							id: 'cdaMandtryGivenName',
							style: 'margin-left:0px;margin-right:0px;',
							value: '*',
							width: 4,
							xtype: 'mandatorydisplayfield'
						},
						{
			    	    	value: 'First Name:',
			    	    	width: 75,
			    	    	xtype: 'displayfield'
			    	    },
					    {
					    	name: 'patient.givenName',
				        	mandatoryCmpId:'cdaMandtryGivenName', 
					    	xtype: 'textfield',
					    	autoCreate: {tag: 'input', type: 'text', size: '50', autocomplete: 'off', maxlength: '50'},
					    	maxLength: 50,
					    	allowBlank: false,
							flex: 1,
					    	blankText: 'Please enter a given name',
					    	invalidText: 'Please enter a given name',
					    	tabIndex: 8
					    },
					    {
							id: 'cdaMandtrymiddleName',
							style: 'margin-left:8px;margin-right:0px;',
							value: ' ',
							width: 4,
							xtype: 'displayfield'
						},
						{
			    	    	value: 'Middle Name:',
			    	    	width: 82,
			    	    	xtype: 'displayfield'
			    	    },
					    {
					    	name: 'patient.middleName',
					    	xtype: 'textfield',
					    	autoCreate: {tag: 'input', type: 'text', size: '50', autocomplete: 'off', maxlength: '50'},
					    	maxLength: 50,
					    	flex: 1,
					    	blankText: 'Please enter a middle name',
					    	invalidText: 'Please enter a middle name',
					    	tabIndex: 9
					    }
		    	  ]
				
	});
	return cda_PersonFirstRowFieldset;
}
 


function cda_BuildPersonSecondRow(cdf_params) {
	var dobReasonData =  [
                 		       ['1', 'Patient Refused'],
                		       ['2', 'Unknown to Patient']
             		       ];
	cda_PersonSecondRowFieldset = 
			new Ext.form.FieldSet({
				layout: 'hbox',
				border: false,
				frame: false,
				style: 'padding:0px;',
				defaults: {
		    		margins:'0 5 5 0',
		    	},
				items:  [
						{
							id: 'cdaMandtryDateOfBirth',
							style: 'margin-left:0px;margin-right:0px;',
							value: '*',
							width: 4,
							xtype: 'mandatorydisplayfield'
						},
						{
			    	    	value: 'Date of Birth:',
			    	    	width: 75,
			    	    	xtype: 'displayfield'
			    	    },
					    {
			    	    	name: 'patient.dateOfBirth',
					    	xtype: 'xdatefield',
				        	mandatoryCmpId:'cdaMandtryDateOfBirth', 
				        	submitFormat: 'm/d/Y H:i:s',
					     	format: 'd/m/Y',
					     	dateFormat : 'd/m/Y',
					     	strict: true,
					     	altFormats	: 'j/m/Y|d/n/Y|j/n/Y',
					     	maxValue: (new Date().add(Date.DAY, -1)),
					     	invalidText : "Incorrect date format. Please re-enter dd/mm/yyyy",
					     	emptyText 	  : 'dd/mm/yyyy',
							tabIndex: 10,
							listeners: {
								'change' : function(field, newValue, oldValue) {
						    			if(newValue<new Date().add(Date.YEAR, -90)){
								    	Ext.Msg.show({
								    		buttons: Ext.MessageBox.YESNO,
								    		fn: function(buttonId, text, opt) {
								    			if(buttonId == 'yes') {
								    			}
								    			
								    			else if(buttonId == 'no') {
								    				cdf_params.cdf_formpanel.form.findField('patient.dateOfBirth').loadValueWithTrackFormReset(null);
								    			}
								    		},
								    		icon: Ext.MessageBox.QUESTION,
								    		msg: 'DOB entered indicated patient is over 90 years of age. Is this correct?',
								    		title: 'Confirm date of birth'
								    	});
						    			}else if(newValue>new Date().add(Date.YEAR, -18)){
						    				Ext.Msg.show({
								    		buttons: Ext.MessageBox.YESNO,
								    		fn: function(buttonId, text, opt) {
								    			if(buttonId == 'yes') {
								    			}
								    			
								    			else if(buttonId == 'no') {
								    				cdf_params.cdf_formpanel.form.findField('patient.dateOfBirth').loadValueWithTrackFormReset(null);
								    			}
								    		},
								    		icon: Ext.MessageBox.QUESTION,
								    		msg: 'DOB entered indicated patient is under 18 years of age. Is this correct?',
								    		title: 'Confirm date of birth'
								    	});
						    			}
			 						}
								}
						},
					    {
			    			name: 'patient.dobUnknown',
			    			xtype: 'checkbox',
			    			id: 'cdaDobUnknownId',
			    			boxLabel: 'DOB Unknown',
			    			margins: '0 0 5 20',
			    			handler: function() {
				                cda_GetPopulatedDobUnknown(cdf_params);
			    			},
					    	tabIndex: 11
					    },
						{
			    	    	width: 20,
			    	    	xtype: 'spacer'
						},
					    {
							id: 'cdaMandtryDobReason',
							style: 'margin-left:0px;margin-right:0px;',
							value: ' ',
							width: 4,
							xtype: 'mandatorydisplayfield'
						},
					    {
			    	    	value: 'Reason:',
			    	    	style: 'margin-left:0px;margin-right:0px;',
			    	    	width: 75,
			    	    	xtype: 'displayfield'
			    	    },
			    	    {
				        	hiddenName: 'patient.dobReason',
				        	mandatoryCmpId:'cdaMandtryDobReason', 
					    	xtype: 'combo',
				        	id: 'cdaDobReasonId',
				        	forceSelection: true,
							triggerAction: 'all',
				        	editable : false,
				        	displayField: 'description',
				        	typeAhead: true,
				        	style: 'margin-left:0px;',
							allowBlank: true,
							readOnly: true,
				        	mode: 'local',
				        	store:new Ext.data.SimpleStore({
	                    		fields: ['id', 'description'],
	                    		data: dobReasonData
                    		}),
				        	tpl: '<tpl for="."><div ext:qtip="{description}" class="x-combo-list-item">{description}&nbsp;</div></tpl>',
				        	valueField: 'description',
							listeners: {
								'select': function(store, records, options) {
							    			cda_GetPopulatedOtherDetailsList(cdf_params);
							     }
							},
							flex: 1,
				        	tabIndex: 12
						},
						{
			    	    	width: 5,
			    	    	xtype: 'spacer'
						},
						{
			    	    	value: 'Postcode:',
			    	    	style: 'margin-left:0px;margin-right:0px;',
			    	    	width: 80,
			    	    	xtype: 'displayfield'
			    	    },
						{
					    	name	   : 'patient.postcode',
					    	width	   : 120,
					    	xtype	   : 'numberfield',
					    	autoCreate: {tag: 'input', type: 'text', size: '4', autocomplete: 'off', maxlength: '4'},
					    	maxLength: 50,
					    	minLength: 4,
					    	maxLength: 4,
					    	tabIndex: 13
					    }
		    	   	]
						
	});
	return cda_PersonSecondRowFieldset;
}

function cda_BuildPersonThirdRow(cdf_params) {

	cda_PersonThirdRowFieldset = 
			new Ext.form.FieldSet({
				layout: 'hbox',
				border: false,
				frame: false,
				style: 'padding:0px;',
				defaults: {
		    		margins:'0 5 0 0',
		    	},
				items:  [
					    {
							id: 'cdaMandtryGender',
							style: 'margin-left:0px;margin-right:0px;',
							value: '*',
							width: 4,
							xtype: 'mandatorydisplayfield'
						},
						{
			    	    	value: 'Gender:',
			    	    	width: 75,
			    	    	xtype: 'displayfield'
			    	    },
					    {
					    	id: 'cda_gender',
			    	    	name: 'patient.gender',
				        	mandatoryCmpId:'cdaMandtryGender', 
					    	xtype: 'radiogroup',
					    	allowBlank: false,
					    	blankText: 'Please select a gender',
					    	columns: 'auto',
					    	fieldLabel: 'Gender',
					    	invalidText: 'Please select a gender',
					    	width: 120,
					    	items: [
						    	    {
						    	    	name: 'patient.gender',
						    	    	boxLabel: 'Male',
						    	    	inputValue: 'M',
					    				tabIndex: 14
						    	    },
						    	    {
						    	    	name: 'patient.gender',
						    	    	boxLabel: 'Female',
						    	    	inputValue: 'F',
					    				tabIndex: 15
						    	   }
						    ]
   					  }
   				]
				
			});
	return cda_PersonThirdRowFieldset;
}

function cda_BuildNonPatient(cdf_params) {
	cda_NonPatientFieldset = 
		new Ext.form.FieldSet({
				defaults: {readOnly : false},
				layout: 'anchor',
				anchor: '100%',
				style: 'margin:4px; margin-top:15px; ',
				title: 'Non Patient Related',
				items:  [
					 	  cda_BuildNonPatientRow(cdf_params)
			    	    ]
			});
	return cda_NonPatientFieldset;
}

function cda_BuildNonPatientRow(cdf_params) {
	cda_NonPatientRowFieldset = new Ext.form.FieldSet({
		layout: 'hbox',
				border: false,
				frame: false,
				style: 'padding:0px; ',
				defaults: {
		    		margins:'0 5 0 0'
		    	},		
		items:  [
			    {
			    	name: 'nonPatient.nonPatientId',
			    	xtype: 'hidden'
			    },
			    {
	    			name: 'nonPatient.nonPatientRelated',
	    			id: 'cdaNonPatientRelated',
	    			xtype: 'checkbox',
	    			boxLabel: 'Non Patient Related',
	    			margins: '0 30 0 0',
	    			clearField: function() {
	    				this.loadValueWithTrackFormReset(false);
	    				cda_setPopulatedNonPatientRelatedConfig(cdf_params);
	    			},
	    			handler: function() {
	    				cda_setPopulatedNonPatientRelatedConfig(cdf_params);
	    			},
					tabIndex: 16
			    },
			    {
					id: 'cdaMandtryServiceDescription',
					style: 'margin-left:0px;margin-right:0px;',
					value: ' ',
					width: 4,
					xtype: 'mandatorydisplayfield'
				},
				{
	    	    	value: 'Service Description:',
	    	    	width: 125,
	    	    	xtype: 'displayfield'
	    	    },
			    {
			    	name: 'nonPatient.serviceDescription',
		        	mandatoryCmpId:'cdaMandtryServiceDescription', 
			    	xtype: 'textarea',
			    	readOnly: true,
			    	fieldLabel: 'Service Description',
			    	maxLength : 150, 
			    	enforceMaxLength: true,
			    	flex: 2,
			    	height: 75,
					tabIndex: 17
			    }
    	    	]
	});
	return cda_NonPatientRowFieldset;
}



function cda_reloadRollStore(cdf_params){
	var roleCmp = Ext.getCmp('cdaRoleId');
	if(roleCmp)
	{
		var rolesStore = roleCmp.store;
		if(rolesStore)
		{
			rolesStore.removeAll();
			rolesStore.loadData(cdf_params.json);
		}	

	}
}

function cda_filterRollStore(cdf_params){
	var roleCmp = Ext.getCmp('cdaRoleId');
	var foCmp = Ext.getCmp('cdaFoList');
	if(roleCmp == null || roleCmp.store == null || foCmp == null || Ext.isEmpty(foCmp.getValue()) ||  foCmp.getValue() < 1)
	{
		if(roleCmp)
		{
			if(roleCmp.store)
			{
				roleCmp.store.removeAll();
			}
			roleCmp.loadValueWithTrackFormReset(null);
		}	
	}
	else
	{	
		var store = roleCmp.store;
		store.insert(0, new Ext.data.Record({ roleId: 0, roleCode: '', descShort:'', descLong:'' }));

			
			var bsId = 'ROLE_BS';
			var bsIndex = store.find('roleCode', bsId);
			var bsRecord = store.getAt(bsIndex);
			var fmoxId = 'ROLE_FMOX';
			var fmoxIndex = store.find('roleCode',fmoxId);
			var fmoxRecord = store.getAt(fmoxIndex);
			var fmorId = 'ROLE_FMOR';
			var fmorIndex = store.find('roleCode',fmorId);
			var fmorRecord = store.getAt(fmorIndex);
			var fneId = 'ROLE_FNE';
			var fneIndex = store.find('roleCode',fneId);
			var fneRecord = store.getAt(fneIndex);
			var internId = 'ROLE_INTRN';
			var internIndex = store.find('roleCode',internId);
			var internRecord = store.getAt(internIndex);
			var snrId = 'ROLE_SNR';
			var snrIndex = store.find('roleCode',snrId);
			var snrRecord = store.getAt(snrIndex);
			if(cdf_params.isFne && cdf_params.isBs){
				store.remove(fmoxRecord);
				store.remove(fmorRecord);
				store.remove(internRecord);
				store.remove(snrRecord);
				
			}else if(cdf_params.isFne){
				store.remove(fmoxRecord);
				store.remove(fmorRecord);
				store.remove(internRecord);
				store.remove(bsRecord);
				store.remove(snrRecord);
				
			}else if(cdf_params.isBs){
				store.remove(internRecord);
				store.remove(fneRecord);
				store.remove(fmoxRecord);
				store.remove(fmorRecord);
				store.remove(snrRecord);
				
			}else if(cdf_params.isIntrn){
				store.remove(bsRecord);
				store.remove(fneRecord);
				store.remove(fmoxRecord);
				store.remove(fmorRecord);
				store.remove(snrRecord);
				
			}else if(cdf_params.isSnr){
				store.remove(bsRecord);
				store.remove(fneRecord);
				store.remove(fmoxRecord);
				store.remove(fmorRecord);
				store.remove(internRecord);
				
			}else if(cdf_params.isFmox){
				store.remove(bsRecord);
				store.remove(fneRecord);
				store.remove(fmorRecord);
				store.remove(internRecord);
				store.remove(snrRecord);
			}else if(cdf_params.isFmor){
				store.remove(bsRecord);
				store.remove(fneRecord);
				store.remove(fmoxRecord);
				store.remove(internRecord);
				store.remove(snrRecord);
			}

			var currRoleId = roleCmp.getValue();
			var currentRec = store.getById(currRoleId);
			if(currentRec == null)
			{
				roleCmp.loadValueWithTrackFormReset(null);
			}	
	}
}


function cda_filterCallOutStore(cdf_params, store, records, options) 
{
	var cmp = Ext.getCmp('cdaCallOutType');
	if(cmp == null || cdf_params.caseRoleId < 1)
	{
		store.removeAll();
		if(cmp)
		{
			cmp.loadValueWithTrackFormReset('');
		}	
	}
	else
	{	
		store.insert(0, new Ext.data.Record({header: '', description: ''}));
		store.sort('position', 'ASC');
		
		var extIndex1 = store.find('header','biolog');
		if(extIndex1 > 0){
			var extRecord1 = store.getAt(extIndex1);
			store.remove(extRecord1);
		}
		
		var extIndex2 = store.find('header','psychi');
		if(extIndex2 > 0){
			var extRecord2 = store.getAt(extIndex2);
			store.remove(extRecord2);
		}
		
		var extIndex3 = store.find('header','court');
		if(extIndex3 > 0){
			var extRecord3 = store.getAt(extIndex3);
			store.remove(extRecord3);
		}
		
		var extIndex4 = store.find('header','testin');
		if(extIndex4 > 0){
			var extRecord4 = store.getAt(extIndex4);
			store.remove(extRecord4);
		}
		
		var extIndex5 = store.find('header','bulk');
		if(extIndex5 > 0){
			var extRecord5 = store.getAt(extIndex5);
			store.remove(extRecord5);
		}
		
		if(cdf_params.myRole == 'ROLE_BS' || cdf_params.myRole == 'ROLE_FNE')
		{
		
			var polaIndex = store.find('header','intern');
			var polaRecord = store.getAt(polaIndex);
			if(polaIndex > 0){
				store.remove(polaRecord);
			}

			var ffiIndex = store.find('header','fitnes');
			var ffiRecord = store.getAt(ffiIndex);
			if(ffiIndex > 0){
				store.remove(ffiRecord);
			}
		
		}
		
		if(cdf_params.myRole == 'ROLE_FNE')
		{
			var tmIndex = store.find('header','traffi');
			var tmRecord = store.getAt(tmIndex);
			if(tmIndex > 0){
				store.remove(tmRecord);
			}
		}
		
		//remove other if external cfp
		if(cdf_params.myRole == 'ROLE_FMOX' || cdf_params.myRole == 'ROLE_BS' || cdf_params.myRole == 'ROLE_FNE')
		{
			var indx = store.find('description','other');
			var rec = store.getAt(indx);
			if(rec)
			{
				store.remove(rec);
			}	
		}
		
		
		//remove existing value if it is not allowed in list
		var currentVal = cmp.getValue(); 
		
		var currRecIndx = store.find('description',currentVal); 
		if(!Ext.isEmpty(currentVal) && store.find('description',currentVal) < 0)
		{
			cmp.loadValueWithTrackFormReset('');
		}	
		
	}	
}



function cda_reloadCallOutStore(cdf_params, myRole){
	var callOutTypeCmp = cdf_params.cdf_formpanel.form.findField('incidentType');
	if(callOutTypeCmp)
	{	
		callOutTypeCmp.store.removeAll();
		callOutTypeCmp.store.loadData(cdf_params.json);
		if(myRole != 'ROLE_FNE' && myRole != 'ROLE_FMOX' && myRole != 'ROLE_FMOR' && myRole != 'ROLE_SNR'){
			var sexjicId = 'sexjic';
			var sexjicIndex = callOutTypeCmp.store.find('header',sexjicId);
			var sexjicRecord = callOutTypeCmp.store.getAt(sexjicIndex);
			callOutTypeCmp.store.remove(sexjicRecord);
		}
		
	}
}


function cda_filterConsultTypeStore(cdf_params, store, records, options) 
{
	var consultTypeCmp = cdf_params.cdf_formpanel.form.findField('consultType');
	var store;
	if(consultTypeCmp == null || cdf_params.caseRoleId < 1)
	{
		store = consultTypeCmp.store;
		store.removeAll();
		if(consultTypeCmp)
		{
			consultTypeCmp.loadValueWithTrackFormReset('');
		}	
	}
	else
	{	
		store = consultTypeCmp.store;
		
		store.insert(0, new Ext.data.Record({header: '', description: ''}));
		store.sort('position', 'ASC');

		var extIndex1 = store.find('header','court'); //'Court Appearance'
		if(extIndex1 > 0){
			var extRecord1 = store.getAt(extIndex1);
			store.remove(extRecord1);
		}

		if(cdf_params.myRole == 'ROLE_FNE' || cdf_params.myRole == 'ROLE_FMOX' || cdf_params.myRole == 'ROLE_BS')
		{

			var extIndex2 = store.find('header','xprtop'); //'Expert opinion'
			if(extIndex2 > 0){
				var extRecord2 = store.getAt(extIndex2);
				store.remove(extRecord2);
			}

			var extIndex3 = store.find('header','phonec'); //'Phone Consultation'
			if(extIndex3 > 0){
				var extRecord3 = store.getAt(extIndex3);
				store.remove(extRecord3);
			}

			var extIndex4 = store.find('header','other'); //'Other'
			if(extIndex4 > 0){
				var extRecord4 = store.getAt(extIndex4);
				store.remove(extRecord4);
			}

		} 
		
		if(cdf_params.myRole == 'ROLE_BS' )
		{
			var extIndex5 = store.find('header','clinex'); //'Clinical Examination'
			if(extIndex5 > 0){
				var extRecord5 = store.getAt(extIndex5);
				store.remove(extRecord5);
			}
		}

		//remove existing value if it is not allowed in list
		var currentVal = consultTypeCmp.getValue(); 
		if(!Ext.isEmpty(currentVal) && store.find('description',currentVal) < 0)
		{
			consultTypeCmp.loadValueWithTrackFormReset('');
		}	
		
		
	}
}

function cda_reloadConsultStore(cdf_params, myRole){
	var consultTypeCmp = cdf_params.cdf_formpanel.form.findField('consultType');
	if(consultTypeCmp)
	{	
		consultTypeCmp.store.removeAll();
		consultTypeCmp.store.loadData(cdf_params.json);
	}
}



//function cda_reloadConsultStore(cdf_params, myRole){
//	cdf_params.fneRec = '';
//	cdf_params.fmoxRec = '';
//	cdf_params.fmoiRec = '';
//	cdf_params.bsRec = '';
//	
//	var consultTypeCmp = cdf_params.cdf_formpanel.form.findField('consultType');
//	var consultStore = consultTypeCmp.store;
//	
//	if(consultTypeCmp == null || cdf_params.caseRoleId < 1)
//	{
//		consultStore.removeAll();
//		if(consultTypeCmp)
//		{
//			consultTypeCmp.loadValueWithTrackFormReset('');
//		}	
//	}
//	else
//	{	
//		consultStore.removeAll();
//		if(myRole == 'ROLE_FNE' || myRole == 'ROLE_FMOX')
//		{
//				cdf_params.fneRec = myRole;
//				consultStore.insert(0, new Ext.data.Record({ id: '0', description: '' }));
//				consultStore.insert(1, new Ext.data.Record({ id: '1', description: 'Clinical Examination' }));
//				consultStore.insert(2, new Ext.data.Record({ id: '2', description: 'Biological Specimens' }));
//				consultStore.insert(3, new Ext.data.Record({ id: '3', description: 'Court Appearance - Half Day' }));
//				consultStore.insert(4, new Ext.data.Record({ id: '4', description: 'Court Appearance - Full Day' }));
//			
//		} 
//		else if(myRole == 'ROLE_BS' )
//		{
//			//cdf_params.fmoiRec =  myRole ;
//			consultStore.insert(0, new Ext.data.Record({ id: '0', description: '' }));
//			consultStore.insert(1, new Ext.data.Record({ id: '1', description: 'Biological Specimens' }));
//			consultStore.insert(2, new Ext.data.Record({ id: '2', description: 'Court Appearance - Half Day' }));
//			consultStore.insert(3, new Ext.data.Record({ id: '3', description: 'Court Appearance - Full Day' }));
//		}
//		else if(myRole == 'ROLE_INTRN' || myRole == 'ROLE_SNR' || myRole == 'ROLE_FMOR' )
//		{
//			cdf_params.fmoiRec = 'fmoi';
//			consultStore.insert(0, new Ext.data.Record({ id: '0', description: '' }));
//			consultStore.insert(1, new Ext.data.Record({ id: '1', description: 'Clinical Examination' }));
//			consultStore.insert(1, new Ext.data.Record({ id: '2', description: 'Expert opinion' }));
//			consultStore.insert(2, new Ext.data.Record({ id: '3', description: 'Biological Specimens' }));
//			consultStore.insert(3, new Ext.data.Record({ id: '4', description: 'Court Appearance - Half Day' }));
//			consultStore.insert(4, new Ext.data.Record({ id: '5', description: 'Court Appearance - Full Day' }));
//			consultStore.insert(5, new Ext.data.Record({ id: '6', description: 'Phone Consultation' }));
//			consultStore.insert(6, new Ext.data.Record({ id: '7', description: 'Other' }));
//		} 
//		
//		
//		//remove existing value if it is not allowed in list
//		var currentVal = consultTypeCmp.getValue(); 
//		if(!Ext.isEmpty(currentVal) && consultStore.find('description',currentVal) < 0)
//		{
//			consultTypeCmp.loadValueWithTrackFormReset('');
//		}	
//
//		
//		 
////		var output = '';
////		consultStore.each(function(rec){
////			var data = rec.data;
////			var output1 = '';
////			for (property in data) {
////			  output1 += property + ': ' +data[property]+'; ';
////			}
////			output += '[' + output1 + ']';
////		});
////		console.log('consultStore = '+output);
//
//		
//	}
//}

function cda_GetPopulatedDobUnknown(cdf_params){
	var dobUnknownChB = cdf_params.cdf_formpanel.form.findField('patient.dobUnknown').getValue();
	var nonPatientRelatedChB = Ext.getCmp('cdaNonPatientRelated').getValue();
	
	var dateOfBirth = cdf_params.cdf_formpanel.form.findField('patient.dateOfBirth');
	var dobReason = cdf_params.cdf_formpanel.form.findField('patient.dobReason');
	
	if (dobUnknownChB)
	{
		cdf_setToOptionalReadOnly(dateOfBirth);
		dateOfBirth.loadValueWithTrackFormReset(null);
		
		cdf_setToMandatoryEditable(dobReason);
		dobReason.validate();  
	}else{
		if(!nonPatientRelatedChB){
			cdf_setToMandatoryEditable(dateOfBirth);
			dateOfBirth.validate();  
		}  

		cdf_setToOptionalReadOnly(dobReason);
		dobReason.loadValueWithTrackFormReset(null);
	}

}

function cda_setPopulatedNonPatientRelatedConfig(cdf_params) {
	
	var nonPatientRelatedChB = Ext.getCmp('cdaNonPatientRelated').getValue();
		                
	var surname = cdf_params.cdf_formpanel.form.findField('patient.surname');
	var givenName = cdf_params.cdf_formpanel.form.findField('patient.givenName');
	var dateOfBirth = cdf_params.cdf_formpanel.form.findField('patient.dateOfBirth');
	var gender = cdf_params.cdf_formpanel.form.findField('patient.gender');
	var serviceDescription = cdf_params.cdf_formpanel.form.findField('nonPatient.serviceDescription');
	var middleName = cdf_params.cdf_formpanel.form.findField('patient.middleName');
	var dobReason = cdf_params.cdf_formpanel.form.findField('patient.dobReason');
	var dobUnknownChB =  cdf_params.cdf_formpanel.form.findField('patient.dobUnknown').getValue();
	
	if (!nonPatientRelatedChB)
	{
		cdf_setToMandatoryEditable(surname);
		surname.validate();  
		
		cdf_setToMandatoryEditable(givenName);
		givenName.validate();  
		
		if(!dobUnknownChB){
			cdf_setToMandatoryEditable(dateOfBirth);
			dateOfBirth.validate();  
		}

		cdf_setToMandatoryEditable(gender);
		gender.validate();  

		serviceDescription.setMandatory(false, false);
		serviceDescription.setViewOnly(true);
		serviceDescription.loadValueWithTrackFormReset('');
	}
	else
	{
		cdf_setToOptionalEditable(surname);

		givenName.setMandatory(false, false);
		surname.setViewOnly(false);

		cdf_setToOptionalEditable(dateOfBirth);

		cdf_setToOptionalEditable(gender);
		gender.loadValueWithTrackFormReset('');
		
		cdf_setToMandatoryEditable(serviceDescription);
		serviceDescription.validate();  
	}
}

function cda_GetPopulatedOtherDetailsList(cdf_params) {
	
	var consultation = cdf_params.cdf_formpanel.form.findField('consultType');
	var incidentType = cdf_params.cdf_formpanel.form.findField('incidentType');
	var otherDetails = cdf_params.cdf_formpanel.form.findField('otherDetails');

	callOutVal = (incidentType != null && !Ext.isEmpty(incidentType.getValue()) ? incidentType.getValue().toLowerCase() : '');
	consultVal = (consultation != null && !Ext.isEmpty(consultation.getValue()) ? consultation.getValue().toLowerCase() : '');

	if(consultVal == 'other' || callOutVal == 'other') {
		cdf_setToMandatoryEditable(otherDetails);
		otherDetails.validate();  
	}
	else
	{
		cdf_setToOptionalReadOnly(otherDetails);
	}

	
}

function cda_InitServiceDate(cdf_params){
	
	var serviceDate = cdf_params.cdf_formpanel.form.findField('serviceDate');
	var serServiceDate = cdf_params.cdf_formpanel.form.findField('service.serviceDate');
	if(Ext.isEmpty(serviceDate.getValue())) {
		serviceDate.loadValueWithTrackFormReset(cdf_params.servServiceDate);
	}
	
	
}


function cda_actionRoleChange(cdf_params) {
	cda_reloadCallOutStore(cdf_params,cdf_params.myRole);
	cda_reloadConsultStore(cdf_params,cdf_params.myRole);
	cda_reloadReportStore(cdf_params,cdf_params.myRole);
	cds_ActivateVehicalRate(cdf_params);
	
	cfc_calculateFeeAll(cdf_params);
	
	var frmNonPatientRelatedCmp = cdf_params.cdf_formpanel.form.findField('nonPatient.nonPatientRelated');
	if(cdf_params.caseRoleId == 10 || cdf_params.caseRoleId == 11 || cdf_params.caseRoleId == 14)
	{
		cdf_setToOptionalReadOnly(frmNonPatientRelatedCmp);
		frmNonPatientRelatedCmp.clearField();
	}	
	else
	{
		frmNonPatientRelatedCmp.setViewOnly(false);
	}	
}

function cda_ActionCallOutType(cdf_params){
	cda_ActionCallOutTypeDelays(cdf_params);
	cda_SetServiceTimePermissions(cdf_params);
}

function cda_ActionCallOutTypeDelays(cdf_params){
	var callOut = cdf_params.cdf_formpanel.form.findField('incidentType');
	
	var consult = cdf_params.cdf_formpanel.form.findField('consultType');
	
	var delaysChkBox = Ext.getCmp('cdsDelays');
	var callReceivedDateTime = Ext.getCmp('cdsCallReceivedDateTime');
	var caseArrivedDateTime = Ext.getCmp('cdsCaseArrivedDateTime');
	
	var delayed = false;
	
	if(delaysChkBox != null)
	{
		
		if(
				callReceivedDateTime != null && 
				caseArrivedDateTime != null && 
				!Ext.isEmpty(callReceivedDateTime.getValue()) && 
				!Ext.isEmpty(caseArrivedDateTime.getValue()) && 
				callOut != null && 
				consult != null && 
				!Ext.isEmpty(callOut.getValue()) &&
				!Ext.isEmpty(consult.getValue())
		)
		{
			callOutVal = callOut.getValue().toLowerCase();
			consultVal = consult.getValue().toLowerCase();
			
			received = callReceivedDateTime.getValue();
			arrived =  caseArrivedDateTime.getValue();
			
			receivedTime = received.getTime();
			arrivedTime =  arrived.getTime();
			
			
			diffTime = (arrivedTime - receivedTime);
			diffTimeMins = diffTime / 60000;
			
			if(callOutVal == 'traffic medicine'  &&  consultVal == 'biological specimens' && diffTimeMins > 180 )
			{
				delayed = true;
			}
			else if(callOutVal == 'physical assault'  &&  consultVal == 'clinical examination' && diffTimeMins > 180 )
			{
				delayed = true;
			}
			else if((callOutVal == 'sexual assault'  || callOutVal == 'Sexual Assault - JIC'  || callOutVal == 'sexual assault - recent') &&  consultVal == 'clinical examination' && diffTimeMins > 120 )
			{
				delayed = true;
			}
			else if(callOutVal == 'traffic medicine'  &&  consultVal == 'clinical examination' && diffTimeMins > 120 )
			{
				delayed = true;
			}
			else if( callOutVal == 'fitness for interview'  &&  consultVal == 'clinical examination' && diffTimeMins > 120 )
			{
				delayed = true;
			}
		}

		delaysChkBox.setAutoDelayed(delayed);
	}	
}

function cda_ActionConsultType(cdf_params){
	cda_SetServiceTimePermissions(cdf_params);
}

function cda_SetServiceTimePermissions(cdf_params){
	var callOut = cdf_params.cdf_formpanel.form.findField('incidentType');
	var cancelled = cdf_params.cdf_formpanel.form.findField('service.cancelled');
	var cfmClinic = cdf_params.cdf_formpanel.form.findField('service.cfmClinic');
	
	var callReceivedDate = cdf_params.cdf_formpanel.form.findField('service.callReceivedDate');
	
	var frmCallReceivedTime = cdf_params.cdf_formpanel.form.findField('frmCallReceivedTime');
	
	var serviceDate = cdf_params.cdf_formpanel.form.findField('service.serviceDate');
	
	var frmTravelCommenced = cdf_params.cdf_formpanel.form.findField('frmTravelCommenced');
	
	var frmTravelConcluded = cdf_params.cdf_formpanel.form.findField('frmTravelConcluded');
	
	var frmCaseArrived = cdf_params.cdf_formpanel.form.findField('frmCaseArrived');
	
	var frmCaseCommenced = cdf_params.cdf_formpanel.form.findField('frmCaseCommenced');
	
	var frmCaseConcluded = cdf_params.cdf_formpanel.form.findField('frmCaseConcluded');

	cancelledVal = cancelled.getValue();
	cfmClinicVal = cfmClinic.getValue();
	
	serviceDate.setMandatory(true, false);

	var consult = cdf_params.cdf_formpanel.form.findField('consultType');

	callOutVal = (callOut != null && !Ext.isEmpty(callOut.getValue()) ? callOut.getValue().toLowerCase() : '');
	consultVal = (consult != null && !Ext.isEmpty(consult.getValue()) ? consult.getValue().toLowerCase() : '');

		if(callOutVal == 'other' || consultVal == 'other') {
			cdf_setToOptionalEditable(callReceivedDate);
			cdf_setToOptionalEditable(frmCallReceivedTime);
			
			cdf_setToOptionalEditable(frmTravelCommenced);
			cdf_setToOptionalEditable(frmTravelConcluded);
			cdf_setToOptionalEditable(frmCaseArrived);
			cdf_setToOptionalEditable(frmCaseCommenced);
			cdf_setToOptionalEditable(frmCaseConcluded);
		}
		else if( consultVal == 'court appearance - half day' ||  consultVal == 'court appearance - full day' ||  consultVal == 'expert opinion' )
		{

			frmCallReceivedTime.clearField();
			cdf_setToOptionalReadOnly(frmCallReceivedTime);

			callReceivedDate.clearField();
			cdf_setToOptionalReadOnly(callReceivedDate);
			
			cdf_setToOptionalReadOnly(frmTravelCommenced);
			cdf_setToOptionalReadOnly(frmTravelConcluded);
			cdf_setToOptionalEditable(frmCaseArrived);
			cdf_setToOptionalEditable(frmCaseCommenced);
			cdf_setToOptionalEditable(frmCaseConcluded);
		}
		else if(consultVal == 'phone consultation')
		{
			cdf_setToMandatoryEditable(callReceivedDate);
			cdf_setToMandatoryEditable(frmCallReceivedTime);
			
			cdf_setToOptionalEditable(frmTravelCommenced);
			cdf_setToOptionalEditable(frmTravelConcluded);
			cdf_setToOptionalEditable(frmCaseArrived);
			cdf_setToOptionalEditable(frmCaseCommenced);
			cdf_setToOptionalEditable(frmCaseConcluded);
		}
		else
		{
			
			if (cancelledVal == true && cfmClinicVal == false ) 
			{
				cdf_setToMandatoryEditable(callReceivedDate);
				cdf_setToMandatoryEditable(frmCallReceivedTime);
				cdf_setToMandatoryEditable(frmTravelCommenced);
				cdf_setToMandatoryEditable(frmTravelConcluded);
				cdf_setToOptionalReadOnly(frmCaseArrived);
				cdf_setToOptionalReadOnly(frmCaseCommenced);
				cdf_setToOptionalReadOnly(frmCaseConcluded);
			} 
			else if ((cancelledVal == true || cancelledVal == false ) && cfmClinicVal == true )
			{
				cdf_setToOptionalReadOnly(callReceivedDate);
				cdf_setToOptionalReadOnly(frmCallReceivedTime);
				cdf_setToOptionalReadOnly(frmTravelCommenced);
				cdf_setToOptionalReadOnly(frmTravelConcluded);
				cdf_setToOptionalReadOnly(frmCaseArrived);
				cdf_setToOptionalReadOnly(frmCaseCommenced);
				cdf_setToOptionalReadOnly(frmCaseConcluded);

				
			} 
			else
			{
				cdf_setToMandatoryEditable(callReceivedDate);
				cdf_setToMandatoryEditable(frmCallReceivedTime);
				cdf_setToMandatoryEditable(frmTravelCommenced);
				cdf_setToMandatoryEditable(frmTravelConcluded);
				cdf_setToMandatoryEditable(frmCaseArrived);
				cdf_setToMandatoryEditable(frmCaseCommenced);
				cdf_setToMandatoryEditable(frmCaseConcluded);
			}
		}
}


//function cda_ValidateFields(cdf_params) {
//	var valid = true;
//	var manMsg = false;
//	var foId = cdf_params.cdf_formpanel.form.findField('foId');
//	var serviceDate = cdf_params.cdf_formpanel.form.findField('serviceDate');
//	var roleId = cdf_params.cdf_formpanel.form.findField('roleId');
//	var consultType = cdf_params.cdf_formpanel.form.findField('consultType');
//	var dateOfBirth = cdf_params.cdf_formpanel.form.findField('patient.dateOfBirth');
//	var dobReason = cdf_params.cdf_formpanel.form.findField('patient.dobReason');
//	var incidentType = cdf_params.cdf_formpanel.form.findField('incidentType');
//	
//	var otherDetails = cdf_params.cdf_formpanel.form.findField('otherDetails');
//	
//	var serviceDescription = cdf_params.cdf_formpanel.form.findField('nonPatient.serviceDescription');
//	var nonPatientRelatedChB = Ext.getCmp('cdaNonPatientRelated').getValue();
//	var dobReasonChB = Ext.getCmp('cdaDobUnknownId').getValue();
//	
//	
//	if(otherDetails.isMandatory() == true && otherDetails.getValue() == '') {
//		otherDetails.setMandatory(true, false);
//		otherDetails.validate();
//		otherDetails.isValid();
//		manMsg = true;
//		valid = false;
//	}
//	
//	if(cdf_params.isAdmin){
//		if(foId.getValue() == null || foId.getValue() == '') {
//			foId.setMandatory(true, false);
//			foId.validate();
//			foId.isValid();
//			manMsg = true;
//			valid = false;
//		}
//	}
//	if(roleId.getValue() == null || roleId.getValue() == '') {
//		roleId.setMandatory(true, false);
//		roleId.validate();
//		roleId.isValid();
//		manMsg = true;
//		valid = false;
//	}
//	if(serviceDate.getValue() == null || serviceDate.getValue() == '') {
//		serviceDate.setMandatory(true, false);
//		serviceDate.validate();
//		serviceDate.isValid();
//		manMsg = true;
//		valid = false;
//	}
//	
//	if(incidentType.getValue() == null || incidentType.getValue() == '') {
//		incidentType.setMandatory(true, false);
//		incidentType.validate();
//		incidentType.isValid();
//		manMsg = true;
//		valid = false;
//	}
//	
//	if(consultType.getValue() == null || consultType.getValue() == '') {
//		consultType.setMandatory(true, false);
//		consultType.validate();
//		consultType.isValid();
//		manMsg = true;
//		valid = false;
//	}
//
////	if( dateOfBirth.isMandatory() == true && Ext.isEmpty(dateOfBirth)) {
////		dateOfBirth.setMandatory(true, false);
////		dateOfBirth.validate();
////		dateOfBirth.isValid();
////		manMsg = true;
////		valid = false;
////	}else{
////		dateOfBirth.setMandatory(false, false);
////	}
////	dateOfBirth.validate();
////	dateOfBirth.isValid();
//
//	dateOfBirth.validate();
//	valid = cds_setValid(valid, dateOfBirth.isValid());
//	if(!valid)
//	{
//		manMsg = true;
//	}	
//	
//	if(nonPatientRelatedChB && (serviceDescription.getValue() == null || serviceDescription.getValue() == '')) {
//		serviceDescription.setMandatory(true, false);
//		serviceDescription.validate();
//		serviceDescription.isValid();
//		cda_ServiceDescError();
//		valid = false;
//	}
//	
//	if( dobReasonChB ) {
//		if(dobReason.getValue() == null || dobReason.getValue() == ''){
//			dobReason.setMandatory(true, false);
//			dobReason.validate();
//			dobReason.isValid();
//			manMsg = true;
//			valid = false;
//		}
//	}
//	
//	valid = cda_NonPatientRelatedChB(cdf_params, valid);
//	
//	if(manMsg == true){
//		cda_MandatoryError();
//	}
//	return valid;
//}

function cda_ValidateFields(cdf_params) {
	var valid = true;
	var manMsg = false;
	var foId = cdf_params.cdf_formpanel.form.findField('foId');
	var serviceDate = cdf_params.cdf_formpanel.form.findField('serviceDate');
	var roleId = cdf_params.cdf_formpanel.form.findField('roleId');
	var consultType = cdf_params.cdf_formpanel.form.findField('consultType');
	var dateOfBirth = cdf_params.cdf_formpanel.form.findField('patient.dateOfBirth');
	var dobReason = cdf_params.cdf_formpanel.form.findField('patient.dobReason');
	var incidentType = cdf_params.cdf_formpanel.form.findField('incidentType');
	
	var otherDetails = cdf_params.cdf_formpanel.form.findField('otherDetails');
	
	var serviceDescription = cdf_params.cdf_formpanel.form.findField('nonPatient.serviceDescription');
	var nonPatientRelatedChB = Ext.getCmp('cdaNonPatientRelated').getValue();
	var dobReasonChB = Ext.getCmp('cdaDobUnknownId').getValue();
	
	
	otherDetails.validate();
	valid = cds_setValid(valid, otherDetails.isValid());
	if(!valid)
	{
		manMsg = true;
	}	

	if(cdf_params.isAdmin){
		foId.validate();
		valid = cds_setValid(valid, foId.isValid());
		if(!valid)
		{
			manMsg = true;
		}	
	}
	
	roleId.validate();
	valid = cds_setValid(valid, roleId.isValid());
	if(!valid)
	{
		manMsg = true;
	}	
	
	serviceDate.validate();
	valid = cds_setValid(valid, serviceDate.isValid());
	if(!valid)
	{
		manMsg = true;
	}	

	incidentType.validate();
	valid = cds_setValid(valid, incidentType.isValid());
	if(!valid)
	{
		manMsg = true;
	}	
	
	consultType.validate();
	valid = cds_setValid(valid, consultType.isValid());
	if(!valid)
	{
		manMsg = true;
	}	
	
	dateOfBirth.validate();
	valid = cds_setValid(valid, dateOfBirth.isValid());
	if(!valid)
	{
		manMsg = true;
	}	
	
	dobReason.validate();
	valid = cds_setValid(valid, dobReason.isValid());
	if(!valid)
	{
		manMsg = true;
	}	
	
	
	serviceDescription.validate();
	valid = cds_setValid(valid, serviceDescription.isValid());
	if(!valid)
	{
		cda_ServiceDescError();
	}	
	
	valid = cda_NonPatientRelatedChB(cdf_params, valid);
	
	if(manMsg == true){
		cda_MandatoryError();
	}
	
	return valid;
}

function cda_NonPatientRelatedChB(cdf_params, valid) {

	var chbValid = true;
	var manMsg = false;
	var nonPatientRelatedChB = Ext.getCmp('cdaNonPatientRelated').getValue();
	var dobReasonChB = Ext.getCmp('cdaDobUnknownId');
	
	var surname = cdf_params.cdf_formpanel.form.findField('patient.surname');
	var givenName = cdf_params.cdf_formpanel.form.findField('patient.givenName');
	var dateOfBirth = cdf_params.cdf_formpanel.form.findField('patient.dateOfBirth');
	var dobReason = cdf_params.cdf_formpanel.form.findField('patient.dobReason');
	var gender = cdf_params.cdf_formpanel.form.findField('patient.gender');
	var middleName = cdf_params.cdf_formpanel.form.findField('patient.middleName');
	var postcode = cdf_params.cdf_formpanel.form.findField('patient.postcode');
	var vld = true;
	
	if(!nonPatientRelatedChB ){
		surname.validate();
		chbValid = cds_setValid(chbValid, surname.isValid());

		givenName.validate();
		chbValid = cds_setValid(chbValid, givenName.isValid());

		middleName.validate();
		chbValid = cds_setValid(chbValid, middleName.isValid());

		dateOfBirth.validate();
		chbValid = cds_setValid(chbValid, dateOfBirth.isValid());

		gender.validate();
		chbValid = cds_setValid(chbValid, gender.isValid());

		postcode.validate();
		chbValid = cds_setValid(chbValid, postcode.isValid());
		
		if(!chbValid){
			cda_MandatoryError();
		}
	}
	else if(nonPatientRelatedChB )
	{
		
		surname.validate();
		chbValid = cds_setValid(chbValid, surname.isValid());
		vld = Ext.isEmpty(surname.getValue());
		if(!vld)
		{
			chbValid = cds_setValid(chbValid, vld);
			surname.setActiveError('Data entry conflict. You have entered patient details but flagged case Non Patient Related. To correct, uncheck Non Patient Related flag or remove patient details.');
		}	

		givenName.validate();
		chbValid = cds_setValid(chbValid, givenName.isValid());
		vld = Ext.isEmpty(givenName.getValue());
		if(!vld)
		{
			chbValid = cds_setValid(chbValid, vld);
			givenName.setActiveError('Data entry conflict. You have entered patient details but flagged case Non Patient Related. To correct, uncheck Non Patient Related flag or remove patient details.');
		}	

		middleName.validate();
		chbValid = cds_setValid(chbValid, middleName.isValid());
		vld = Ext.isEmpty(middleName.getValue());
		if(!vld)
		{
			chbValid = cds_setValid(chbValid, vld);
			middleName.setActiveError('Data entry conflict. You have entered patient details but flagged case Non Patient Related. To correct, uncheck Non Patient Related flag or remove patient details.');
		}	

		dateOfBirth.validate();
		chbValid = cds_setValid(chbValid, dateOfBirth.isValid());
		vld = Ext.isEmpty(dateOfBirth.getValue());
		if(!vld)
		{
			chbValid = cds_setValid(chbValid, vld);
			dateOfBirth.setActiveError('Data entry conflict. You have entered patient details but flagged case Non Patient Related. To correct, uncheck Non Patient Related flag or remove patient details.');
		}	
		
		postcode.validate();
		chbValid = cds_setValid(chbValid, postcode.isValid());
		vld = Ext.isEmpty(postcode.getValue());
		if(!vld)
		{
			chbValid = cds_setValid(chbValid, vld);
			postcode.setActiveError('Data entry conflict. You have entered patient details but flagged case Non Patient Related. To correct, uncheck Non Patient Related flag or remove patient details.');
		}	
		
		dobReasonChB.validate();
		chbValid = cds_setValid(chbValid, dobReasonChB.isValid());
		vld = (Ext.isEmpty(dobReasonChB.getValue()) || dobReasonChB.getValue() != true);
		if(!vld)
		{
			chbValid = cds_setValid(chbValid, vld);
			dateOfBirth.setActiveError('Data entry conflict. You have entered patient details but flagged case Non Patient Related. To correct, uncheck Non Patient Related flag or remove patient details.');
		}	

		dobReason.validate();
		chbValid = cds_setValid(chbValid, dobReason.isValid());
		vld = Ext.isEmpty(dobReason.getValue());
		if(!vld)
		{
			chbValid = cds_setValid(chbValid, vld);
			dateOfBirth.setActiveError('Data entry conflict. You have entered patient details but flagged case Non Patient Related. To correct, uncheck Non Patient Related flag or remove patient details.');
		}	

		gender.validate();
		chbValid = cds_setValid(chbValid, gender.isValid());
		vld = Ext.isEmpty(gender.getValue());
		if(!vld)
		{
			chbValid = cds_setValid(chbValid, vld);
			gender.setActiveError('Data entry conflict. You have entered patient details but flagged case Non Patient Related. To correct, uncheck Non Patient Related flag or remove patient details.');
		}	
		
		if(!chbValid){
			cda_NonPatientError();
		}

	}
	

	return 	cds_setValid(valid, chbValid);
}

//function cda_NonPatientRelatedChB(cdf_params, valid) {
//	
//	var chbValid = valid;
//	var manMsg = false;
//	var nonPatientRelatedChB = Ext.getCmp('cdaNonPatientRelated').getValue();
//	var dobReasonChB = Ext.getCmp('cdaDobUnknownId').getValue();
//	
//	var surname = cdf_params.cdf_formpanel.form.findField('patient.surname');
//	var givenName = cdf_params.cdf_formpanel.form.findField('patient.givenName');
//	var dateOfBirth = cdf_params.cdf_formpanel.form.findField('patient.dateOfBirth');
//	var dobReason = cdf_params.cdf_formpanel.form.findField('patient.dobReason');
//	var gender = cdf_params.cdf_formpanel.form.findField('patient.gender');
//	var middleName = cdf_params.cdf_formpanel.form.findField('patient.middleName');
//	
//	if(!nonPatientRelatedChB ){
//		if (Ext.isEmpty(surname.getValue())) {
//			surname.setMandatory(true, false);
//			surname.validate();
//			surname.isValid();
//			manMsg = true;
//			chbValid = false;
//		}else{
//			surname.setMandatory(false, false);
//		}
//		
//		if(givenName.getValue() == null || givenName.getValue() == '') {
//			givenName.setMandatory(true, false);
//			givenName.validate();
//			givenName.isValid();
//			manMsg = true;
//			chbValid = false;
//		}else{
//			givenName.setMandatory(false, false);
//		}
//		
////		if(dateOfBirth.isMandatory() == true && (dateOfBirth.getValue() == null || dateOfBirth.getValue() == '')){
////			dateOfBirth.setMandatory(true, false);
////			dateOfBirth.validate();
////			dateOfBirth.isValid();
////			manMsg = true;
////			chbValid = false;
////		}else{
////			dateOfBirth.setMandatory(false, false);
////		}
//		
//		dateOfBirth.validate();
//		chbValid = cds_setValid(chbValid, dateOfBirth.isValid());
//		if(!chbValid)
//		{
//			manMsg = true;
//		}	
//		
//		if(gender.getValue() == null || gender.getValue() == '') {
//			gender.setMandatory(true, false);
//			gender.validate();
//			gender.isValid();
//			manMsg = true;
//			chbValid = false;
//		}else{
//			gender.setMandatory(false, false);
//		}
//		
//	}
//	else if(nonPatientRelatedChB )
//	{
//		if( !(surname.getValue() == null || surname.getValue() == '' )){
//			chbValid = false;
//			cda_NonPatientError();
//			surname.setMandatory(true, false);
//			surname.validate();
//			surname.isValid();
//		}else{
//			surname.setMandatory(false, false);
//		}
//		
//		if( !(givenName.getValue() == null || givenName.getValue() == '' )){
//			chbValid = false;
//			cda_NonPatientError();
//			givenName.setMandatory(true, false);
//			givenName.validate();
//			givenName.isValid();
//		}else{
//			givenName.setMandatory(false, false);
//		}
//		
//		if( !(middleName.getValue() == null || middleName.getValue() == '' )){
//			chbValid = false;
//			cda_NonPatientError();
//			middleName.setMandatory(true, false);
//			middleName.validate();
//			middleName.isValid();
//		}else{
//			middleName.setMandatory(false, false);
//		}
//		
////		if(dateOfBirth.isMandatory() == true && !(dateOfBirth.getValue() == null || dateOfBirth.getValue() == '')){
////			chbValid = false; 
////			cda_NonPatientError();
////			dateOfBirth.setMandatory(true, false);
////			dateOfBirth.validate();
////			dateOfBirth.isValid();
////		}else{
////			dateOfBirth.setMandatory(false, false);
////		}
//		
//		dateOfBirth.validate();
//		chbValid = cds_setValid(chbValid, dateOfBirth.isValid());
//		if(!chbValid)
//		{
//			cda_NonPatientError();
//		}	
//		
//		if( !(gender.getValue() == null || gender.getValue() == '')){
//			chbValid = false;  
//			cda_NonPatientError();
//			gender.setMandatory(true, false);
//			gender.validate();
//			gender.isValid();
//		}else{
//			gender.setMandatory(false, false);
//		}
//	}
//	
//	if(manMsg == true){
//		cda_MandatoryError();
//	}
//	
//	return chbValid;
//}
//
function cda_MandatoryError() {
	Ext.MessageBox.show({
        title: 'Error',
        msg: 'All mandatory * fields must be entered.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function cda_ServiceDateError() {
	Ext.MessageBox.show({
        title: 'Error',
        msg: 'Date entry conflict. Date of Service in Attendance and Refferal screens must match.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function cda_OtherDetailsError() {
	Ext.MessageBox.show({
        title: 'Error',
        msg: 'Define Call Out or Consultation Type in Other Details field.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function cda_NonPatientError() {
	Ext.MessageBox.show({
        title: 'Error',
        msg: 'Data entry conflict. You have entered patient details but flagged case Non Patient Related. To correct, uncheck Non Patient Related flag or remove patient details.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

function cda_ServiceDescError() {
	Ext.MessageBox.show({
        title: 'Error',
        msg: 'Service Description field must be entered where a case is non patient related.',
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}