var items=[{name:"Blank",description:"Just an empty board",numericPriority:1,previewName:"blank.png",definition:{viewMode:"board",zoomLevel:{board:3}}},{name:"People",description:"All active users in the system",numericPriority:2,previewName:"people.png",tags:["people","scrum","kanban"],definition:{cells:{types:["user"],filter:"?IsActive is True",ordering:{name:"First Name"}},viewMode:"list",zoomLevel:{list:3,board:5}}},{name:"People by Project",description:"All active users by projects",numericPriority:5,previewName:"peopleByProject.png",tags:["people","project","scrum","kanban"],definition:{cells:{types:["user"],filter:"?IsActive is True",ordering:{name:"First Name"}},y:{types:["project"]},viewMode:"board",zoomLevel:{board:3}}},{name:"People by Team",description:"All active users by team",numericPriority:6,previewName:"peopleByTeam.png",tags:["people","team","scrum","kanban"],definition:{cells:{types:["user"],filter:"?IsActive is True",ordering:{name:"First Name"}},y:{types:["team"]},viewMode:"board",zoomLevel:{board:3}}},{name:"People by Role",description:"All active users grouped by Roles",numericPriority:3,previewName:"peopleByRole.png",tags:["people","scrum","kanban"],definition:{cells:{types:["user"],filter:"?IsActive is True",ordering:{name:"First Name"}},x:{types:["role"]},viewMode:"board",zoomLevel:{board:5}}},{name:"Backlog",description:"List of all User Stories",numericPriority:7,previewName:"backlog.png",tags:["backlog","scrum","kanban"],definition:{cells:{types:["userstory"]},y:{types:["priority"]},viewMode:"list",zoomLevel:{board:3}}},{name:"Story Mapping",description:"User Stories grouped by Feature",numericPriority:10,previewName:"storyMapping.png",tags:["scrum","backlog"],definition:{cells:{types:["userstory"]},y:{types:["feature"],ordering:{name:"Rank"}},viewMode:"board",zoomLevel:{board:3}}},{name:"Story Mapping by Release",description:"User Stories grouped by Feature to plan the next two Releases",numericPriority:11,previewName:"storyMappingByRelease.png",tags:["scrum","backlog","planning"],definition:{cells:{types:["userstory"]},x:{types:["release"],filter:"?It is current or It is future(2) or It is past(1)",ordering:{name:"Start Date",direction:"Asc"}},y:{types:["feature"],ordering:{name:"Rank"}},viewMode:"board",zoomLevel:{board:3}}},{name:"Feature Progress",description:"Actual state of Features grouped by State",numericPriority:16,previewName:"featureProgress.png",tags:["scrum","kanban","progress"],definition:{cells:{types:["feature"]},x:{types:["entitystate"]},viewMode:"board",zoomLevel:{board:3}}},{name:"Estimation",description:"All Use Stories grouped by Effort",numericPriority:12,previewName:"estimation.png",tags:["scrum"],definition:{cells:{types:["userstory"]},x:{types:["effort"]},viewMode:"board",zoomLevel:{board:3}}},{name:"Release Plan",description:"Assign work to Releases",numericPriority:13,previewName:"releasePlan.png",tags:["scrum","planning"],definition:{cells:{types:["userstory","bug"]},x:{types:["release"],ordering:{name:"Start Date",direction:"Asc"}},viewMode:"board",zoomLevel:{board:3}}},{name:"Iteration Plan",description:"Assign work to iterations",numericPriority:14,previewName:"iterationPlan.png",tags:["scrum","iteration","planning"],definition:{cells:{types:["userstory","bug"]},x:{types:["iteration"],filter:"?Release is Current",ordering:{name:"Start Date",direction:"Asc"}},viewMode:"board",zoomLevel:{board:6}}},{name:"Task Board",description:"Track tasks' progress",numericPriority:19,previewName:"taskBoard.png",tags:["scrum","progress"],definition:{cells:{types:["task","bug"]},x:{types:["entitystate"]},y:{types:["userstory"],ordering:{name:"Rank"}},viewMode:"board",zoomLevel:{board:3}}},{name:"User Story Progress",description:"Track Stories' and Bugs' progress",numericPriority:17,previewName:"userStoryProgress.png",tags:["scrum","progress"],definition:{cells:{types:["userstory"]},x:{types:["entitystate"]}},viewMode:"board",zoomLevel:{board:3}},{name:"My Work",description:"Your personal view with everything assigned to you",numericPriority:26,previewName:"myWork.png",tags:["scrum","kanban","progress"],definition:{cells:{types:["feature","userstory","bug","task"],filter:"?AssignedUser.Where(it is Me)"},x:{types:["entitystate"]},viewMode:"board",zoomLevel:{board:3}}},{name:"Work by Person",description:"Stories and Bugs grouped by Person",numericPriority:22,previewName:"workByPerson.png",tags:["scrum","people","kanban","progress"],definition:{cells:{types:["bug","userstory"]},x:{types:["entitystate"]},y:{types:["assigneduser"],ordering:{name:"First Name"}},viewMode:"board",zoomLevel:{board:3}}},{name:"Work by Project",description:"Track cross-project work progress",numericPriority:23,previewName:"workByProject.png",tags:["scrum","project","kanban","progress"],definition:{cells:{types:["bug","userstory"]},x:{types:["entitystate"]},y:{types:["project"]},viewMode:"board",zoomLevel:{board:3}}},{name:"Projects by Team",description:"High-level view of Projects by Team",numericPriority:8,previewName:"projectsByTeam.png",tags:["project","team"],definition:{cells:{types:["project"],ordering:{name:"Name"}},y:{types:["team"]},viewMode:"board",zoomLevel:{board:5}}},{name:"Work by Team",description:"Track work progress by Team",numericPriority:24,previewName:"workByTeam.png",tags:["team","progress"],definition:{cells:{types:["userstory","bug"]},x:{types:["entitystate"]},y:{types:["team"]},viewMode:"board",zoomLevel:{board:3}}},{name:"Story Progress by Feature",description:"Actual state of Stories grouped by feature",numericPriority:18,previewName:"storyProgressByFeature.png",tags:["scrum","progress"],definition:{cells:{types:["userstory"]},x:{types:["entitystate"]},y:{types:["feature"],ordering:{name:"Rank"}},viewMode:"board",zoomLevel:{board:3}}},{name:"Open Bugs",description:"Open Bugs grouped by Severity and Priority",numericPriority:29,previewName:"openBugs.png",tags:["qa","scrum","kanban","progress"],definition:{cells:{types:["bug"],filter:"?EntityState.IsFinal == False"},x:{types:["severity"]},y:{types:["priority"]}},viewMode:"board",zoomLevel:{board:3}},{name:"Bugs in Current Iteration",description:"Open Bugs in current Iteration",numericPriority:30,previewName:"bugsInCurrentIteration.png",tags:["scrum","progress"],definition:{cells:{types:["bug"],filter:"?Iteration is Current"},x:{types:["entitystate"]},y:{types:["priority"]},viewMode:"board",zoomLevel:{board:3}}},{name:"Test Plans",description:"Test Plans with assigned Test Cases",numericPriority:32,previewName:"testPlans.png",tags:["qa"],definition:{cells:{types:["testcase"]},y:{types:["testplan"]},viewMode:"board",zoomLevel:{board:3}}},{name:"Test Case Coverage",description:"Test Case coverage in Current Iteration",numericPriority:31,previewName:"testCaseCoverage.png",tags:["qa"],definition:{cells:{types:["testcase"]},y:{types:["userstory"],filter:"?Iteration is Current",ordering:{name:"Rank"}},viewMode:"board",zoomLevel:{board:3}}},{name:"Kanban Board",description:"Workflow by State",numericPriority:27,previewName:"kanban.png",tags:["kanban","progress"],definition:{cells:{types:["userstory","bug"]},x:{types:["entitystate"]},viewMode:"board",zoomLevel:{board:3}}},{name:"Personal Kanban",description:"Your personal Kanban board with everything assigned to you",numericPriority:28,previewName:"personalKanban.png",tags:["kanban","progress"],definition:{cells:{types:["userstory","bug"],filter:"?AssignedUser.Where(It is Me)"},x:{types:["entitystate"]},viewMode:"board",zoomLevel:{board:3}}},{name:"Work by Tags",description:"Work grouped by Tag",numericPriority:25,previewName:"workByTags.png",tags:["kanban","scrum"],definition:{cells:{types:["feature","userstory","task","bug"]},y:{types:["tag"]},viewMode:"board",zoomLevel:{board:3}}},{name:"Recently Added Work",description:"All work added last week",numericPriority:38,previewName:"recentlyAddedWork.png",tags:["scrum","kanban"],definition:{cells:{types:["feature","userstory","task","bug"],filter:"?CreateDate > today - 7(days)"},x:{types:["createdate"],filter:"?It > today - 7(days)"},viewMode:"board",zoomLevel:{board:4}}},{name:"Team Iteration Plan",description:"Iteration plan for your Team with work from several projects",numericPriority:37,previewName:"teamIterationPlan.png",tags:["planning","iteration"],definition:{cells:{types:["bug","userstory"]},x:{types:["teamiteration"],filter:"?it is current or it is future(2)",ordering:{name:"Start Date",direction:"Asc"}},viewMode:"board",zoomLevel:{board:6}}},{name:"Impediments",description:"All blockers grouped by State",numericPriority:33,previewName:"impediments.png",tags:["impediments"],definition:{cells:{types:["impediment"]},x:{types:["entitystate"]},y:{types:["assigneduser"]},viewMode:"board",zoomLevel:{board:4}}},{name:"Ideas",description:"List of open ideas",numericPriority:36,previewName:"ideas.png",tags:["help desk"],definition:{cells:{types:["request"],filter:'?RequestType is "Idea" and EntityState.IsFinal != true'},y:{types:["priority"]},viewMode:"list",zoomLevel:{list:3}}},{name:"Requests Queue",description:"List of open issues",numericPriority:34,previewName:"requestsQueue.png",tags:["help desk"],definition:{cells:{types:["request"],filter:'?(LastCommentedUser.Kind is "Requester" or Comments.Count == 0) and EntityState.IsFinal != true',ordering:{name:"Last Comment Date"}},y:{types:["priority"]},viewMode:"list",zoomLevel:{list:3}}},{name:"Request Progress",description:"Prioritized Requests",numericPriority:35,previewName:"requestProgress.png",tags:["help desk","progress"],definition:{cells:{types:["request"]},x:{types:["entitystate"]},y:{types:["priority"]}}},{name:"Feature Planning by Release",description:"Plan features to Releases",numericPriority:15,previewName:"featurePlanningByRelease.png",tags:["scrum","planning"],definition:{cells:{types:["feature"]},x:{types:["release"],ordering:{direction:"Asc"}},viewMode:"board",zoomLevel:{board:3}}},{name:"Task Board (Current Iteration)",description:"Track Task progress in Current Iteration",numericPriority:20,previewName:"taskBoardCurrentIteration.png",tags:["scrum","progress"],definition:{cells:{types:["task"]},x:{types:["entitystate"]},y:{types:["userstory"],filter:"?Iteration is Current",ordering:{name:"Rank"}}}},{name:"Tasks by Person",description:"Tasks grouped by Person in Current Iteration",numericPriority:21,previewName:"tasksByPerson.png",tags:["people","scrum","progress"],definition:{cells:{types:["task"],filter:"?Iteration is Current"},x:{types:["entitystate"]},y:{types:["assigneduser"],ordering:{name:"First Name"}},viewMode:"board",zoomLevel:{board:3}}},{name:"Teams by Project",description:"High-level view of Teams grouped by Project",numericPriority:9,previewName:"teamsByProject.png",tags:["team","project"],definition:{cells:{types:["team"]},y:{types:["project"]},viewMode:"board",zoomLevel:{board:5}}},{name:"Projects",description:"All projects in the system",numericPriority:4,previewName:"projects.png",tags:["project","scrum","kanban"],definition:{cells:{types:["project"],filter:"?IsActive is True",ordering:{name:"Name"}},viewMode:"list",zoomLevel:{list:3}}}],groups=[{name:"kanban",items:["Personal Kanban","Backlog","Kanban Board","Work by Person","Recently Added Work","People","Projects","People by Project"]},{name:"scrum",items:["My Work","Backlog","Story Mapping","Estimation","Release Plan","Iteration Plan","Task Board","User Story Progress","Work by Person","People","Projects","People by Project"]},{name:"scratch",items:["My Work","Backlog","People","Projects","People by Project"]}],q="            INSERT INTO [ClientStorage]([StorageGroupId], [Key], [OwnerId], [Scope])    \n                VALUES(                                                                 \n                    @boardTemplatesGroupID                                              \n                    ,'%s'                                                               \n                    ,@userID                                                            \n                    ,'Public')                                                          \n                                                                                        \n            SET @storageID = @@IDENTITY                                                 \n                                                                                        \n            INSERT INTO [ClientStorageOwner]([ClientStorageId, OwnerId])                \n                VALUES(@storageID, @userID)                                             \n                                                                                        \n            INSERT INTO [ClientStorageData] ([StorageId], [Value], [Key])               \n                SELECT       @storageID, '%s', 'name'                                   \n                UNION SELECT @storageID, '%s', 'description'                            \n                UNION SELECT @storageID, '%s', 'definition'                             \n                UNION SELECT @storageID, '%s', 'numericPriority'                        \n                UNION SELECT @storageID, '%s', 'previewName'                            \n                UNION SELECT @storageID, '%s', 'type'                                   \n                UNION SELECT @storageID, '%s', 'tags'",e=JSON.stringify,qs=_.map(items,function(r){return r.id=_.uniqueId("boardtemplate"),_.sprintf(q,r.id,e(r.name),e(r.description.replace(/(['])/g,"''")),e(r.definition).replace(/(['])/g,"''"),e(r.numericPriority),e(r.previewName),e("system"),e(r.tags||[]))
}),qGroup="                        INSERT INTO [ClientStorage]([StorageGroupId], [Key], [OwnerId], [Scope])    \n                            VALUES(                                                                 \n                                @boardTemplateGroupsGroupID                                         \n                                ,REPLACE(CAST(NEWID() AS NVARCHAR(255)), '-', '')                   \n                                ,@userID                                                           \n                                ,'Public')                                                          \n                                                                                                    \n                        SET @storageID = @@IDENTITY                                                 \n                                                                                                    \n                        INSERT INTO [ClientStorageOwner]([ClientStorageId, OwnerId])                \n                            VALUES(@storageID, @userID)                                             \n                                                                                                    \n                        INSERT INTO [ClientStorageData] ([StorageId], [Value], [Key]                \n                            SELECT       @storageID, '%s', 'name'                                   \n                            UNION SELECT @storageID, '%s', 'boardTemplateIds'                       \n                            UNION SELECT @storageID, '%s', 'type'",qsGroup=_.map(groups,function(r){var t=_.pluck(_.map(r.items,function(e){return _.find(items,function(r){return r.name==e})}),"id");if(t<r.items)throw Error("bad");return _.sprintf(qGroup,e(r.name),e(t),e("system"))});console.log(qs.join("\n\n\n")+qsGroup.join("\n\n\n"));