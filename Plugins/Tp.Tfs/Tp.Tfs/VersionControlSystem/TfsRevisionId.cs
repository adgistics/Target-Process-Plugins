// 
// Copyright (c) 2005-2012 TargetProcess. All rights reserved.
// TargetProcess proprietary/confidential. Use is subject to license terms. Redistribution of this file is strictly forbidden.
// 

using System;
using Tp.SourceControl.VersionControlSystem;

namespace Tp.Tfs.VersionControlSystem
{
	[Serializable]
	public class TfsRevisionId : IComparable
	{
		public static readonly DateTime UtcTimeMin = DateTime.MinValue.ToUniversalTime();
		public static readonly DateTime UtcTimeMax = new DateTime(2038, 01, 19).ToUniversalTime();

		public TfsRevisionId()
		{
		}

		public TfsRevisionId(RevisionId revisionId)
		{
			Time = (!revisionId.Time.HasValue || revisionId.Time.Value < UtcTimeMin) ? UtcTimeMin : revisionId.Time.Value;
			Value = revisionId.Value;
		}

		public DateTime Time { get; set; }
		public string Value { get; set; }

		public static implicit operator TfsRevisionId(RevisionId revisionId)
		{
			return new TfsRevisionId(revisionId);
		}

		public static implicit operator RevisionId(TfsRevisionId revisionId)
		{
			return new RevisionId { Value = revisionId.Value, Time = revisionId.Time };
		}

		public int CompareTo(object obj)
		{
			if (obj is RevisionId || obj is TfsRevisionId)
			{
				var thatRevisionId = (TfsRevisionId)obj;
				return Int32.Parse(Value).CompareTo(thatRevisionId.Value);
			}
			return 0;
		}

		public override string ToString()
		{
			return string.Format("RevisionId: {0}, Date: {1}", Value, Time);
		}
	}
}