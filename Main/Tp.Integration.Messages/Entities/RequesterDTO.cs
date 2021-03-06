//-----------------------------------------------------------------------------
// This code was generated by a tool.
// Changes to this file will be lost if the code is regenerated.
//-----------------------------------------------------------------------------
using System;
using System.Xml.Serialization;using System.Runtime.Serialization;
using Tp.Integration.Common;

namespace Tp.Integration.Common
{
    /// <summary>
    /// Data Transfer object of Requester. 
    /// </summary>
	[Serializable][DataContract]
	public partial class RequesterDTO : DataTransferObject
	{
        /// <summary>
        /// Gets or sets the ID.
        /// </summary>
        /// <value>The ID.</value>		
		[PrimaryKey]
		public override int? ID
		{
			get { return UserID; }
			set
			{
				if (value == int.MinValue)
					value = null;

				UserID = value;
			}
		}

        /// <summary>
        /// Gets or sets the User ID.
        /// </summary>
        /// <value>The User ID.</value>
		[PrimaryKey]
		[DataMember][XmlElement(Order = 3)]public int? UserID { get; set; }
		

		/// <summary>
        /// Gets or sets the First Name. 
        /// </summary>
        /// <value>The First Name.</value>
		[DataMember][XmlElement(Order = 4)]public String FirstName { get; set; }

		/// <summary>
        /// Gets or sets the Last Name. 
        /// </summary>
        /// <value>The Last Name.</value>
		[DataMember][XmlElement(Order = 5)]public String LastName { get; set; }

		/// <summary>
        /// Gets or sets the Email. 
        /// </summary>
        /// <value>The Email.</value>
		[DataMember][XmlElement(Order = 6)]public String Email { get; set; }

		/// <summary>
        /// Gets or sets the Login. 
        /// </summary>
        /// <value>The Login.</value>
		[DataMember][XmlElement(Order = 7)]public String Login { get; set; }

		/// <summary>
        /// Gets or sets the Password. 
        /// </summary>
        /// <value>The Password.</value>
		[DataMember][XmlElement(Order = 8)]public String Password { get; set; }

		/// <summary>
        /// Gets or sets the Create Date. 
        /// </summary>
        /// <value>The Create Date.</value>
		[DataMember][XmlElement(Order = 9)]public DateTime? CreateDate { get; set; }

		/// <summary>
        /// Gets or sets the Modify Date. 
        /// </summary>
        /// <value>The Modify Date.</value>
		[DataMember][XmlElement(Order = 10)]public DateTime? ModifyDate { get; set; }

		/// <summary>
        /// Gets or sets the Delete Date. 
        /// </summary>
        /// <value>The Delete Date.</value>
		[DataMember][XmlElement(Order = 11)]public DateTime? DeleteDate { get; set; }

		/// <summary>
        /// Gets or sets the Is Active. 
        /// </summary>
        /// <value>The Is Active.</value>
		[DataMember][XmlElement(Order = 12)]public Boolean? IsActive { get; set; }

		/// <summary>
        /// Gets or sets the Is Administrator. 
        /// </summary>
        /// <value>The Is Administrator.</value>
		[DataMember][XmlElement(Order = 13)]public Boolean? IsAdministrator { get; set; }

		/// <summary>
        /// Gets or sets the Skills. 
        /// </summary>
        /// <value>The Skills.</value>
		[DataMember][XmlElement(Order = 14)]public String Skills { get; set; }

		/// <summary>
        /// Gets or sets the Phone. 
        /// </summary>
        /// <value>The Phone.</value>
		[DataMember][XmlElement(Order = 15)]public String Phone { get; set; }

		/// <summary>
        /// Gets or sets the Notes. 
        /// </summary>
        /// <value>The Notes.</value>
		[DataMember][XmlElement(Order = 16)]public String Notes { get; set; }

		/// <summary>
        /// Gets or sets the Source Type. 
        /// </summary>
        /// <value>The Source Type.</value>
		[DataMember][XmlElement(Order = 17)]public RequesterSourceTypeEnum? SourceType { get; set; }
		
		/// <summary>
        /// Gets or sets the Company ID. 
        /// </summary>
        /// <value>The Company ID.</value>
		[ForeignKey]
		[DataMember][XmlElement(Order = 18)]public Int32? CompanyID { get; set; }
		

		
	}
	
	
	/// <summary>
    /// Requester fields
    /// </summary>
	public enum RequesterField
	{
        /// <summary>
        /// First Name
        /// </summary>		
		FirstName,
        /// <summary>
        /// Last Name
        /// </summary>		
		LastName,
        /// <summary>
        /// Email
        /// </summary>		
		Email,
        /// <summary>
        /// Login
        /// </summary>		
		Login,
        /// <summary>
        /// Password
        /// </summary>		
		Password,
        /// <summary>
        /// Create Date
        /// </summary>		
		CreateDate,
        /// <summary>
        /// Modify Date
        /// </summary>		
		ModifyDate,
        /// <summary>
        /// Delete Date
        /// </summary>		
		DeleteDate,
        /// <summary>
        /// Is Active
        /// </summary>		
		IsActive,
        /// <summary>
        /// Is Administrator
        /// </summary>		
		IsAdministrator,
        /// <summary>
        /// Skills
        /// </summary>		
		Skills,
        /// <summary>
        /// Phone
        /// </summary>		
		Phone,
        /// <summary>
        /// Notes
        /// </summary>		
		Notes,
        /// <summary>
        /// Source Type
        /// </summary>		
		SourceType,
        /// <summary>
        /// Company ID
        /// </summary>		
		CompanyID,
	}
}
