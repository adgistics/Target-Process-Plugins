var mockData={avatarPath:"unknown.jpg"};mockData.userStory=function(config){var story={id:345,loggedUserId:1,permissions:{canChangeOwner:!0,canChangeAssignments:!0},name:"View & Edit",roles:[{id:1,name:"Developer",pair:!0,hasEffort:!0},{id:2,name:"QA",pair:!1,hasEffort:!1},{id:3,name:"Designer",pair:!1,hasEffort:!1},{id:4,name:".NET Coder",pair:!1,hasEffort:!1},{id:5,name:"Support Person",pair:!1,hasEffort:!1}],users:[{id:1,name:"Vasya Pupkin",roleId:5,avatar:mockData.avatarPath},{id:2,name:"Tolay Green",roleId:1,avatar:mockData.avatarPath},{id:3,name:"Donald Duck",roleId:2,avatar:mockData.avatarPath},{id:4,name:"Pup Vaskin",roleId:4,avatar:mockData.avatarPath},{id:5,name:"Mmm Aaa",roleId:1,avatar:mockData.avatarPath},{id:6,name:"Uuu Iii",roleId:2,avatar:mockData.avatarPath}],owner:{id:6},definedRoles:[1,2,3],efforts:[{roleId:1,effortToDo:15,effortDone:12,effort:45}],states:[{id:1,name:"Open",nextStates:[2,3]},{id:2,name:"In Progress",nextStates:[1,3,4]},{id:3,name:"Done",nextStates:[1,2],commentIsRequired:!0},{id:4,name:"Closed",nextStates:[1]}],assignments:[{userId:1,roleId:2},{userId:2,roleId:1}],totals:{toDo:12,done:15}};return config?_.extend(story,overrides):story}