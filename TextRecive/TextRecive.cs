using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Specialized;
using System.Text.RegularExpressions;

namespace TextRecive
{
    public class FieldValues
    {
        public string[] Columns { get; private set; }
        public string[] Values { get; private set; }

        public string this[string column]
        {
            get
            {
                if (!Columns.Any(x => x == column))
                {
                    throw new InvalidOperationException("column is not exist.");
                }

                var index = Columns.Select((x, i) => new { Column = x, Index = i }).First(x => x.Column == column).Index;
                return Values[index];
            }
        }
    }

    public interface ITextLine
    {
        TextFildParserContext CurrentContext { get; }
        FieldValues FieldValues { get; }   
        int LineNoInAllLines { get; }        
        int LineNoInSection { get; }
        int SectionNo { get; }        
        List<string> ErrorList { get; }
        List<string> NoticeList { get; }
        void SetNoticeList();
        void UpdateValues();        
        void SetErrorList();        
    }

    public class TextFildParserContext
    {
        public IReadOnlyCollection<ITextLine> LoadedAllLines { get; private set; }
        public IReadOnlyCollection<ITextLine> SectionLines { get; private set; }
        public Dictionary<string, object> CacheParameters { get; private set;}
    }

    public abstract class TextLine : ITextLine
    {
        private bool _executedUpdateValues;        
        private bool _executedSetErrorList;
        private bool _executedSetNoticeList;        
        public TextFildParserContext CurrentContext { get; }
        public FieldValues FieldValues { get; private set; }
        public int LineNoInAllLines { get; }        
        public int LineNoInSection { get; }
        public int SectionNo { get; }       
        public List<string> ErrorList { get; private set; }
        public List<string> NoticeList { get; private set; }
        
        void ITextLine.UpdateValues()
        {
            if (!_executedUpdateValues)
            {
                UpdateValues();     
                _executedUpdateValues = true;       
            }
            else
            {
                throw new InvalidOperationException("UpdateValues method is executed.");
            }
            
        }
        void ITextLine.SetErrorList()
        {
            if (!_executedSetErrorList)
            {
                SetErrorList();
                _executedSetErrorList = true;
            }
            else
            {
                throw new InvalidOperationException("SetErrorList method is executed.");
            }
        }
        void ITextLine.SetNoticeList()
        {
            if (!_executedSetNoticeList)
            {
                SetNoticeList();
                _executedSetNoticeList = true;
            }
            else
            {
                throw new InvalidOperationException("SetNoticeList method is executed.");
            }
        }
        protected abstract void UpdateValues();        
        protected abstract void SetErrorList();
        protected abstract void SetNoticeList();        
    }

    public interface IMapRule<TTextLine, TDest> where TTextLine : ITextLine where TDest : class
    {
        IMapRule<TTextLine, TProperty, TDest> ToRoot<TProperty>();
        IMapRule<TTextLine, TProperty, TDest> ToOne<TProperty>(Expression<Func<TDest, TProperty>> destPrperty, params Expression<Func<TTextLine, object>>[] uniqueProperties);
        IMapRule<TTextLine, TProperty, TDest> ToMany<TProperty>(Expression<Func<TDest, IEnumerable<TProperty>>> destPrperty, params Expression<Func<TTextLine, object>>[] uniqueProperties);
    }

    public interface IMapRule<TTextLine, TProperty, TDest> where TTextLine : ITextLine where TDest : class
    {
        IMapRule<TTextLine, TProperty, TDest> CreateInstance(Func<TProperty> createInstance);
        IMapRule<TTextLine, TProperty, TDest> TargetProperty(string regularExpression, string replacement);
    }

    public interface ITextLineSection<TTextLine> where TTextLine : ITextLine
    {        
        TTextLine[] TextLines { get; }        
        void AddError(string message);        
        void AddNotice(string message);        
        T Map<T>();
    }

    public interface ITextFildParser<TTextLine> where TTextLine : ITextLine
    {
        ITextLineSection<TTextLine>[] TextLineSections { get; }
        bool Validate();        
        System.IO.Stream CreateErrorStream();
        System.IO.Stream CreateNoticeStream();
        void SetMapRule<TDest>(Action<IMapRule<TTextLine, TDest>> setMapRule) where TDest : class;
    }

    public class TextFildParser<TTextLine> : ITextFildParser<TTextLine> where TTextLine : ITextLine
    {
        public TextFildParser(System.IO.Stream stream, string[] headerNames, string[] sectionKeys)        
        {

        }

        public TextFildParser(System.IO.Stream stream, string[] headerNames, string[] sectionKeys, Func<TTextLine> createLine)
        {

        }
        public ITextLineSection<TTextLine>[] TextLineSections { get; private set; }
        public bool Validate() => TextLineSections.Any(x => !x.TextLines.Any(y => y.ErrorList.Count > 0));       
        public System.IO.Stream CreateErrorStream()
        {
            return null;
        }
        public System.IO.Stream CreateNoticeStream()
        {
            return null;
        }
        public void SetMapRule<TDest>(Action<IMapRule<TTextLine, TDest>> setMapRule) where TDest : class
        {

        }
    }
}
