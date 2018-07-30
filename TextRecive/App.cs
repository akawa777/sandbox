using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Specialized;
using System.Text.RegularExpressions;

namespace TextRecive
{
    public class CommandApp
    {
        private IItemTextLineService _itemTextLineService;
        private dynamic _repository;
        private dynamic _mapper;
        private static dynamic Session;

        public void Update(ItemDto itemDto)
        {
            using (var tran = Session.Tran())
            {
                var item = _repository.Find(itemDto.Id);

                _mapper.Map(itemDto, item);

                item.Register();

                _repository.Save(item);

                tran.Complete();
            }
        }
        
        public System.IO.Stream BulkUpdate(System.IO.Stream stream)
        {
            using (var tran = Session.Tran())
            {
                var textFildParser = new TextFildParser<ItemTextLine>(
                    stream,                    
                    new string[] { "Id", "Attr", "MasterCd", "SubId", "SubAttr" },
                    new string[] { "Id" },
                    () => new ItemTextLine(_itemTextLineService));

                if (!textFildParser.Validate())
                {
                    return textFildParser.CreateErrorStream();
                }

                textFildParser.SetMapRule<ItemDto>(mapRule =>
                {
                    mapRule.ToMany(dto => dto.SubItemList, line => line.SubId)
                        .TargetProperty("Id", "ItemId")
                        .TargetProperty("^Sub", "SubSub");
                });              

                foreach (var textLineSection in textFildParser.TextLineSections)
                {
                    try
                    {
                        var itemDto = textLineSection.Map<ItemDto>();  

                        // var AdjustedMasterCd = textLineSection.TextLines[0].MasterCd;
                        // var planeMasterCd = textLineSection.TextLines[0].FieldValues["MasterCd"];

                        var item = _repository.Find(itemDto.Id);
                        _mapper.Map(itemDto, item);

                        item.Register();

                        if (textFildParser.Validate())
                        {
                            _repository.Save(item);
                        }
                    }
                    catch(Exception e)
                    {
                        textLineSection.AddError(e.Message);

                        // textLineSection.TextLines[0].ErrorList.Add(e.Message);
                        // textLineSection.TextLines[0].NoticeList.Add(e.Message);
                    }
                }

                if (textFildParser.Validate())
                {
                    tran.Complete();

                    return textFildParser.CreateNoticeStream();
                }
                else
                {
                    return textFildParser.CreateErrorStream();
                }
            }
        }
    } 

    public class ItemDto
    {
        public int Id { get; set; }
        public string Attr { get; set; }
        public string MasterCd { get; set; }
        public List<SubItemDto> SubItemList { get; set;}
    }

    public class SubItemDto
    {
        public int ItemId { get; set; }
        public int SubSubId { get; set; }
        public int SubSubAttr { get; set;}
    }
}
