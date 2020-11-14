using System;

namespace Core.Helpers
{
    public interface IDateTimeProvider
    {
        DateTime GetDateTimeNow();
    }
}
