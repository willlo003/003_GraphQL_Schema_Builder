import { useBetween } from "use-between";
import React, { useEffect } from "react";

const useShareableState = () => {
  const [dataQueries, setDataQueries] = React.useState<Array<object>>([]);
  const [rootQueries, setRootQueries] = React.useState<Array<string>>([]);
  const [typeQueries, setTypeQueries] = React.useState<Array<string>>([]);
  const [tempPair, setTempPair] = React.useState<Array<string>>([]);
  const [connectedPair, setConnectedPair] = React.useState<
    Array<Array<string>>
  >([]);
  return {
    dataQueries,
    setDataQueries,
    rootQueries,
    setRootQueries,
    typeQueries,
    setTypeQueries,
    tempPair,
    setTempPair,
    connectedPair,
    setConnectedPair,
  };
};

export default useShareableState;
