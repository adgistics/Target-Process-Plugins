//-----------------------------------------------------------------------------
// This code was generated by a tool.
// Changes to this file will be lost if the code is regenerated.
//-----------------------------------------------------------------------------
using System;
using System.Xml.Serialization;
using Tp.Integration.Common;

namespace Tp.Integration.Common
{
    /// <summary>
    /// Data Transfer object of Request. Represents Request.
    /// </summary>
	[Serializable]
	public partial class RequestDTO : DataTransferObject
	{
        /// <summary>
        /// Gets or sets the ID.
        /// </summary>
        /// <value>The ID.</value>		
		[PrimaryKey]
		public override int? ID
		{
			get { return RequestID; }
			set
			{
				if (value == int.MinValue)
					value = null;

				RequestID = value;
			}
		}

        /// <summary>
        /// Gets or sets the Request ID.
        /// </summary>
        /// <value>The Request ID.</value>
		[PrimaryKey]
		[XmlElement(Order = 3)]public int? RequestID { get; set; }
		

		/// <summary>
        /// Gets or sets the Name. Entity name or title
        /// </summary>
        /// <value>The Name.</value>
		[XmlElement(Order = 4)]public String Name { get; set; }

		/// <summary>
        /// Gets or sets the Description. Entity description
        /// </summary>
        /// <value>The Description.</value>
		[XmlElement(Order = 5)]public String Description { get; set; }

		/// <summary>
        /// Gets or sets the Start Date. For example, start date of the iteration. Relevant for Iteration, Project, Release.
        /// </summary>
        /// <value>The Start Date.</value>
		[XmlElement(Order = 6)]public DateTime? StartDate { get; set; }

		/// <summary>
        /// Gets or sets the End Date. For example, end date of the iteration. Relevant for Iteration, Project, Release.
        /// </summary>
        /// <value>The End Date.</value>
		[XmlElement(Order = 7)]public DateTime? EndDate { get; set; }

		/// <summary>
        /// Gets or sets the Create Date. Date when entity has been created
        /// </summary>
        /// <value>The Create Date.</value>
		[XmlElement(Order = 8)]public DateTime? CreateDate { get; set; }

		/// <summary>
        /// Gets or sets the Modify Date. Date when entity has been modified
        /// </summary>
        /// <value>The Modify Date.</value>
		[XmlElement(Order = 9)]public DateTime? ModifyDate { get; set; }

		/// <summary>
        /// Gets or sets the Last Comment Date. Last comment date
        /// </summary>
        /// <value>The Last Comment Date.</value>
		[XmlElement(Order = 10)]public DateTime? LastCommentDate { get; set; }

		/// <summary>
        /// Gets or sets the Numeric Priority. Calculated priority of entity. Valid for UserStory and Bug for now
        /// </summary>
        /// <value>The Numeric Priority.</value>
		[XmlElement(Order = 11)]public Double? NumericPriority { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field1. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field1.</value>
		[XmlElement(Order = 12)]public String CustomField1 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field2. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field2.</value>
		[XmlElement(Order = 13)]public String CustomField2 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field3. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field3.</value>
		[XmlElement(Order = 14)]public String CustomField3 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field4. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field4.</value>
		[XmlElement(Order = 15)]public String CustomField4 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field5. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field5.</value>
		[XmlElement(Order = 16)]public String CustomField5 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field6. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field6.</value>
		[XmlElement(Order = 17)]public String CustomField6 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field7. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field7.</value>
		[XmlElement(Order = 18)]public String CustomField7 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field8. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field8.</value>
		[XmlElement(Order = 19)]public String CustomField8 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field9. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field9.</value>
		[XmlElement(Order = 20)]public String CustomField9 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field10. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field10.</value>
		[XmlElement(Order = 21)]public String CustomField10 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field11. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field11.</value>
		[XmlElement(Order = 22)]public String CustomField11 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field12. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field12.</value>
		[XmlElement(Order = 23)]public String CustomField12 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field13. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field13.</value>
		[XmlElement(Order = 24)]public String CustomField13 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field14. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field14.</value>
		[XmlElement(Order = 25)]public String CustomField14 { get; set; }

		/// <summary>
        /// Gets or sets the Custom Field15. Reserved property for custom field
        /// </summary>
        /// <value>The Custom Field15.</value>
		[XmlElement(Order = 26)]public String CustomField15 { get; set; }

		/// <summary>
        /// Gets or sets the Effort. Total effort of assignable. Can be set if only one ActorEffort for assignable exists
        /// </summary>
        /// <value>The Effort.</value>
		[XmlElement(Order = 27)]public Decimal? Effort { get; set; }

		/// <summary>
        /// Gets or sets the Effort Completed. Effort spent on assignment. Read-only calculated field
        /// </summary>
        /// <value>The Effort Completed.</value>
		[XmlElement(Order = 28)]public Decimal? EffortCompleted { get; set; }

		/// <summary>
        /// Gets or sets the Effort To Do. Effort required to complete assignment. Read-only calculated field
        /// </summary>
        /// <value>The Effort To Do.</value>
		[XmlElement(Order = 29)]public Decimal? EffortToDo { get; set; }

		/// <summary>
        /// Gets or sets the Time Spent. Total time spent on assignment. Read-only calculated field
        /// </summary>
        /// <value>The Time Spent.</value>
		[XmlElement(Order = 30)]public Decimal? TimeSpent { get; set; }

		/// <summary>
        /// Gets or sets the Time Remain. Total time remaining to complete assignment for Role. Read-only calculated field
        /// </summary>
        /// <value>The Time Remain.</value>
		[XmlElement(Order = 31)]public Decimal? TimeRemain { get; set; }

		/// <summary>
        /// Gets or sets the Source Type. Source Type
        /// </summary>
        /// <value>The Source Type.</value>
		[XmlElement(Order = 32)]public RequestSourceEnum? SourceType { get; set; }

		/// <summary>
        /// Gets or sets the Is Private. visibility of request
        /// </summary>
        /// <value>The Is Private.</value>
		[XmlElement(Order = 33)]public Boolean? IsPrivate { get; set; }

		/// <summary>
        /// Gets or sets the Is Replied. Is Replied
        /// </summary>
        /// <value>The Is Replied.</value>
		[XmlElement(Order = 34)]public Boolean? IsReplied { get; set; }

		/// <summary>
        /// Gets or sets the Last Comment User ID. User who added last comment
        /// </summary>
        /// <value>The Last Comment User ID.</value>
		[ForeignKey]
		[XmlElement(Order = 35)]public Int32? LastCommentUserID { get; set; }

		/// <summary>
        /// Gets or sets the Owner ID. Person who added the entity
        /// </summary>
        /// <value>The Owner ID.</value>
		[ForeignKey]
		[XmlElement(Order = 36)]public Int32? OwnerID { get; set; }

		/// <summary>
        /// Gets or sets the Last Editor ID. Person who edited entity last time
        /// </summary>
        /// <value>The Last Editor ID.</value>
		[ForeignKey]
		[XmlElement(Order = 37)]public Int32? LastEditorID { get; set; }

		/// <summary>
        /// Gets or sets the Entity State ID. State of assignable. For example, User Story may be in Open or Done state
        /// </summary>
        /// <value>The Entity State ID.</value>
		[ForeignKey]
		[XmlElement(Order = 38)]public Int32? EntityStateID { get; set; }

		/// <summary>
        /// Gets or sets the Priority ID. Priority of assignable. For example, User Story may have Must Have or Nice To Have priority
        /// </summary>
        /// <value>The Priority ID.</value>
		[ForeignKey]
		[XmlElement(Order = 39)]public Int32? PriorityID { get; set; }

		/// <summary>
        /// Gets or sets the Project ID. Assignable should belong to Project
        /// </summary>
        /// <value>The Project ID.</value>
		[ForeignKey]
		[XmlElement(Order = 40)]public Int32? ProjectID { get; set; }

		/// <summary>
        /// Gets or sets the Iteration ID. Assignable may be assigned to Iteration or may be in Backlog (Iteration is not defined in this case)
        /// </summary>
        /// <value>The Iteration ID.</value>
		[ForeignKey]
		[XmlElement(Order = 41)]public Int32? IterationID { get; set; }

		/// <summary>
        /// Gets or sets the Parent ID. Used for Task only (Task parent is a User Story)
        /// </summary>
        /// <value>The Parent ID.</value>
		[ForeignKey]
		[XmlElement(Order = 42)]public Int32? ParentID { get; set; }

		/// <summary>
        /// Gets or sets the Release ID. Assignable may be assigned to Release or may be in project Backlog (Release is not defined in this case)
        /// </summary>
        /// <value>The Release ID.</value>
		[ForeignKey]
		[XmlElement(Order = 43)]public Int32? ReleaseID { get; set; }

		/// <summary>
        /// Gets or sets the Request Type ID. Request Type
        /// </summary>
        /// <value>The Request Type ID.</value>
		[ForeignKey]
		[XmlElement(Order = 44)]public Int32? RequestTypeID { get; set; }

		/// <summary>
        /// Gets or sets the Entity Type Name. Type of the entity. For example, Bug, TestCase, Task
        /// </summary>
        /// <value>The Entity Type Name.</value>
		[RelationName]
		[XmlElement(Order = 45)]public virtual string EntityTypeName { get; set; }

		/// <summary>
        /// Gets or sets the Entity State Name. State of assignable. For example, User Story may be in Open or Done state
        /// </summary>
        /// <value>The Entity State Name.</value>
		[RelationName]
		[XmlElement(Order = 46)]public virtual string EntityStateName { get; set; }

		/// <summary>
        /// Gets or sets the Priority Name. Priority of assignable. For example, User Story may have Must Have or Nice To Have priority
        /// </summary>
        /// <value>The Priority Name.</value>
		[RelationName]
		[XmlElement(Order = 47)]public virtual string PriorityName { get; set; }

		/// <summary>
        /// Gets or sets the Project Name. Assignable should belong to Project
        /// </summary>
        /// <value>The Project Name.</value>
		[RelationName]
		[XmlElement(Order = 48)]public virtual string ProjectName { get; set; }

		/// <summary>
        /// Gets or sets the Iteration Name. Assignable may be assigned to Iteration or may be in Backlog (Iteration is not defined in this case)
        /// </summary>
        /// <value>The Iteration Name.</value>
		[RelationName]
		[XmlElement(Order = 49)]public virtual string IterationName { get; set; }

		/// <summary>
        /// Gets or sets the Parent Name. Used for Task only (Task parent is a User Story)
        /// </summary>
        /// <value>The Parent Name.</value>
		[RelationName]
		[XmlElement(Order = 50)]public virtual string ParentName { get; set; }

		/// <summary>
        /// Gets or sets the Release Name. Assignable may be assigned to Release or may be in project Backlog (Release is not defined in this case)
        /// </summary>
        /// <value>The Release Name.</value>
		[RelationName]
		[XmlElement(Order = 51)]public virtual string ReleaseName { get; set; }

		/// <summary>
        /// Gets or sets the Request Type Name. Request Type
        /// </summary>
        /// <value>The Request Type Name.</value>
		[RelationName]
		[XmlElement(Order = 52)]public virtual string RequestTypeName { get; set; }

		/// <summary>
        /// Gets or sets the Entity Type ID. Type of the entity. For example, Bug, TestCase, Task
        /// </summary>
        /// <value>The Entity Type ID.</value>
		[ForeignKey]
		[XmlElement(Order = 53)]public Int32? EntityTypeID { get; set; }
	}
	
	
	/// <summary>
    /// Request fields
    /// </summary>
	public enum RequestField
	{
        /// <summary>
        /// Name
        /// </summary>		
		Name,
        /// <summary>
        /// Description
        /// </summary>		
		Description,
        /// <summary>
        /// Start Date
        /// </summary>		
		StartDate,
        /// <summary>
        /// End Date
        /// </summary>		
		EndDate,
        /// <summary>
        /// Create Date
        /// </summary>		
		CreateDate,
        /// <summary>
        /// Modify Date
        /// </summary>		
		ModifyDate,
        /// <summary>
        /// Last Comment Date
        /// </summary>		
		LastCommentDate,
        /// <summary>
        /// Numeric Priority
        /// </summary>		
		NumericPriority,
        /// <summary>
        /// Custom Field1
        /// </summary>		
		CustomField1,
        /// <summary>
        /// Custom Field2
        /// </summary>		
		CustomField2,
        /// <summary>
        /// Custom Field3
        /// </summary>		
		CustomField3,
        /// <summary>
        /// Custom Field4
        /// </summary>		
		CustomField4,
        /// <summary>
        /// Custom Field5
        /// </summary>		
		CustomField5,
        /// <summary>
        /// Custom Field6
        /// </summary>		
		CustomField6,
        /// <summary>
        /// Custom Field7
        /// </summary>		
		CustomField7,
        /// <summary>
        /// Custom Field8
        /// </summary>		
		CustomField8,
        /// <summary>
        /// Custom Field9
        /// </summary>		
		CustomField9,
        /// <summary>
        /// Custom Field10
        /// </summary>		
		CustomField10,
        /// <summary>
        /// Custom Field11
        /// </summary>		
		CustomField11,
        /// <summary>
        /// Custom Field12
        /// </summary>		
		CustomField12,
        /// <summary>
        /// Custom Field13
        /// </summary>		
		CustomField13,
        /// <summary>
        /// Custom Field14
        /// </summary>		
		CustomField14,
        /// <summary>
        /// Custom Field15
        /// </summary>		
		CustomField15,
        /// <summary>
        /// Effort
        /// </summary>		
		Effort,
        /// <summary>
        /// Effort Completed
        /// </summary>		
		EffortCompleted,
        /// <summary>
        /// Effort To Do
        /// </summary>		
		EffortToDo,
        /// <summary>
        /// Time Spent
        /// </summary>		
		TimeSpent,
        /// <summary>
        /// Time Remain
        /// </summary>		
		TimeRemain,
        /// <summary>
        /// Source Type
        /// </summary>		
		SourceType,
        /// <summary>
        /// Is Private
        /// </summary>		
		IsPrivate,
        /// <summary>
        /// Is Replied
        /// </summary>		
		IsReplied,
        /// <summary>
        /// Last Comment User ID
        /// </summary>		
		LastCommentUserID,
        /// <summary>
        /// Owner ID
        /// </summary>		
		OwnerID,
        /// <summary>
        /// Last Editor ID
        /// </summary>		
		LastEditorID,
        /// <summary>
        /// Entity Type ID
        /// </summary>		
		EntityTypeID,
        /// <summary>
        /// Entity State ID
        /// </summary>		
		EntityStateID,
        /// <summary>
        /// Priority ID
        /// </summary>		
		PriorityID,
        /// <summary>
        /// Project ID
        /// </summary>		
		ProjectID,
        /// <summary>
        /// Iteration ID
        /// </summary>		
		IterationID,
        /// <summary>
        /// Parent ID
        /// </summary>		
		ParentID,
        /// <summary>
        /// Release ID
        /// </summary>		
		ReleaseID,
        /// <summary>
        /// Request Type ID
        /// </summary>		
		RequestTypeID,
        /// <summary>
        /// Entity Type Name
        /// </summary>		
		EntityTypeName,
        /// <summary>
        /// Entity State Name
        /// </summary>		
		EntityStateName,
        /// <summary>
        /// Priority Name
        /// </summary>		
		PriorityName,
        /// <summary>
        /// Project Name
        /// </summary>		
		ProjectName,
        /// <summary>
        /// Iteration Name
        /// </summary>		
		IterationName,
        /// <summary>
        /// Parent Name
        /// </summary>		
		ParentName,
        /// <summary>
        /// Release Name
        /// </summary>		
		ReleaseName,
        /// <summary>
        /// Request Type Name
        /// </summary>		
		RequestTypeName,
	}
}
