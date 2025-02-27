package com.external.plugins.datatypes;

import com.appsmith.external.datatypes.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TidbSpecificDataTypes {
    public static final Map<ClientDataType, List<AppsmithType>> pluginSpecificTypes;

    static {
        pluginSpecificTypes = new HashMap<>();
        pluginSpecificTypes.put(ClientDataType.NULL, List.of(new NullType()));

        pluginSpecificTypes.put(ClientDataType.BOOLEAN, List.of(new TidbBooleanType()));

        pluginSpecificTypes.put(
                ClientDataType.NUMBER,
                List.of(new IntegerType(), new LongType(), new DoubleType(), new BigDecimalType()));

        pluginSpecificTypes.put(ClientDataType.OBJECT, List.of(new JsonObjectType()));

        pluginSpecificTypes.put(
                ClientDataType.STRING,
                List.of(new TimeType(), new TidbDateType(), new TidbDateTimeType(), new StringType()));

        pluginSpecificTypes.put(ClientDataType.ARRAY, List.of(new StringType()));
    }
}
