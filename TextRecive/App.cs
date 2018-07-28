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
        
        public System.IO.Stream ReciveText(System.IO.Stream stream)
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
                        .TargetProperty("^Sub", string.Empty);
                });              

                foreach (var textLineSection in textFildParser.TextLineSections)
                {
                    try
                    {
                        var itemDto = textLineSection.Map<ItemDto>();

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
        public List<SubItemDto> SubItemList { get; set;}
    }

    public class SubItemDto
    {
        public int ItemId { get; set; }
        public int SubId { get; set; }
        public int SubAttr { get; set;}
    }
}
