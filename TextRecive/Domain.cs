using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Specialized;
using System.Text.RegularExpressions;

namespace TextRecive
{
    public class ItemTextLine : TextLine
    {
        public ItemTextLine(IItemTextLineService itemTextLineService)
        {
            _itemTextLineService = itemTextLineService;
        }

        public IItemTextLineService _itemTextLineService;
        
        public string Id { get; set; }
        public string Attr { get; set; }
        public string MasterCd { get; set; }
        public string SubId { get; set;}
        public string SubAttr { get; set; }

        protected override void UpdateValues()
        {
            MasterCd = MasterCd.PadLeft(6, '0');
        }

        protected override void SetErrorList()
        {            
            if (string.IsNullOrEmpty(Id))
            {
                ErrorList.Add("Id is invalid.");
            }
            if (!_itemTextLineService.ExistMaster(this))
            {
                ErrorList.Add("MasterCd is invalid.");
            }            
            if (string.IsNullOrEmpty(FieldValues[nameof(Attr)]))
            {
                ErrorList.Add("Attr is invalid.");
            }
            if (CurrentContext.SectionLines.Any(x => (x as ItemTextLine).SubId == SubId))
            {
                ErrorList.Add("SubId is overlapped.");
            }
        }

        protected override void SetNoticeList()
        {            
            if (string.IsNullOrEmpty(Attr))
            {
                NoticeList.Add("SubAttr is not set." );
            }
        }
    }

    public interface IItemTextLineService
    {
        bool ExistMaster(ItemTextLine itemTextLine);
    }
}
