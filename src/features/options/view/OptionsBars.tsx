import { FC, useState } from "react";
import { json } from "stream/consumers";
import { randomizeArray } from "../../../control/helpers";
import { useAppSelector } from "../../../model/hooks";
import { OptionProps, Order } from "../model/optionModel";
import OptionBar from "./OptionBar";
import OptionBtn from "./OptionBtn";
import OptionColumn from "./OptionColumn";
import OptionInfo from "./OptionInfo";
interface OptionsBarsProps {
  counsilId: string;
  handleShowAddOption: Function;
}

export interface OptionsAnim {
  totalWidth: number;
  options: Array<{
    optionId: string;
    width: number;
  }>;
}

const optionsAnim: OptionsAnim = { totalWidth: 0, options: [] };
const barWidth = 120;
let isStart = true;

const OptionsBars: FC<OptionsBarsProps> = ({
  counsilId,
  handleShowAddOption,
}) => {
  const [orderBy, setOrder] = useState<Order>(Order.RANDOM);
  // const [optionsAnim,setOptionsAnim] = useState<OptionsAnim>({totalWidth:0, options:[]});
  // const [width, setWidth] = useState<number>(0);
  const options = sortOptions(
    useAppSelector((state) =>
      state.options.options.filter((option) => option.counsilId === counsilId)
    ),
    orderBy
  );

  const maxVotes: number = options.reduce((prv, cur) => prv + cur.votes, 0);

  function handleOrder(order: Order) {
    try {
      setOrder(order);
    } catch (error) {
      console.error(error);
      setOrder(Order.NEW);
    }
  }

  function updateWidth(
    optionId: string,
    width: number,
    optionsAnim: OptionsAnim
  ) {
    try {
      const index = optionsAnim.options.findIndex(
        (option) => option.optionId === optionId
      );
      if (index === -1) optionsAnim.options.push({ optionId, width });
      else optionsAnim.options[index].width = width;

      optionsAnim.totalWidth = optionsAnim.options.reduce(
        (prev, curr) => prev + curr.width,
        0
      );
      // setWidth(optionsAnim.totalWidth)
    } catch (error) {
      console.error(error);
    }
  }

  function sortOptions(
    options: Array<OptionProps>,
    order: Order
  ): OptionProps[] {
    let tempOptions: OptionProps[] = [];
    options = JSON.parse(JSON.stringify(options));
    options.sort((a, b) => b.created - a.created);
    options = options.map((option, i) => {
      option.creationOrder = i;
      return option;
    });
    switch (orderBy) {
      case Order.NEW:
        tempOptions = [
          ...options.sort(
            (b: OptionProps, a: OptionProps) =>
              (a.created || 0) - (b.created || 0)
          ),
        ];
        tempOptions = setNewOrder(tempOptions);
        break;
      case Order.VOTED:
        tempOptions = [
          ...options.sort(
            (b: OptionProps, a: OptionProps) => a.votes - b.votes
          ),
        ];
        tempOptions = setNewOrder(tempOptions);
        break;
      case Order.RANDOM:
     
        if (isStart && options.length>1) {
          console.log("randomize", options.length);
          tempOptions = randomizeArray(options);
          tempOptions = setNewOrder(tempOptions);
          isStart = false
        } else {
          console.log("dont randomize", options.length);
          tempOptions = options;
        }

        break;
      default:
        tempOptions = [...options];
        tempOptions = setNewOrder(tempOptions);
    }

    tempOptions = tempOptions.map((op, i) => {
      const option = Object.assign({}, op);
      option.order = i;

      return option;
    });

    return tempOptions;

    function setNewOrder(options: OptionProps[]): OptionProps[] {
      options.forEach((option, i) => {
        if (
          option.hasOwnProperty("creationOrder") &&
          typeof option.creationOrder === "number"
        ) {
          const difBetweenPlaces = (i - option.creationOrder) * barWidth;

          options[i].left = difBetweenPlaces;
        }
      });

      return options;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  return (
    <div className="optionsBar">
      <h3>OptionsBars</h3>
      <p>Total Votes:{maxVotes}</p>
      <div className="fav" onClick={() => handleShowAddOption(true)}>
        +
      </div>
      {options.length === 0 ? (
        <div className="btns">
          <button onClick={() => handleShowAddOption(true)}>ADD OPTION</button>
        </div>
      ) : null}
      <div
        className="optionsBar__wrapper"
        style={{
          gridTemplateColumns: `repeat(${options.length},1fr)`,
        }}>
        {options
          .sort((a, b) => b.created - a.created)
          .map((option) => (
            <OptionColumn
              key={`${option.optionId}-col`}
              option={option}
              width={barWidth}
              optionsAnim={optionsAnim}
              updateWidth={updateWidth}
              maxVotes={maxVotes}
            />
          ))}

        {/* {options.map((option) => (
          <OptionInfo key={`${option.optionId}-info`} option={option} />
        ))} */}
        {/* {options.map((option: OptionProps) => (
          <OptionBtn key={`${option.optionId}-btn`} option={option} />
        ))} */}
      </div>
      <div className="bottomNav">
        <div
          className={
            orderBy === Order.NEW
              ? "bottomNav__btn bottomNav__btn--selected"
              : "bottomNav__btn"
          }
          onClick={() => handleOrder(Order.NEW)}>
          New
        </div>
        <div
          className={
            orderBy === Order.VOTED
              ? "bottomNav__btn bottomNav__btn--selected"
              : "bottomNav__btn"
          }
          onClick={() => handleOrder(Order.VOTED)}>
          Voted
        </div>
        <div
          className={
            orderBy === Order.RANDOM
              ? "bottomNav__btn bottomNav__btn--selected"
              : "bottomNav__btn"
          }
          onClick={() => {
            handleOrder(Order.RANDOM);
          }}>
          Random
        </div>
      </div>
    </div>
  );
};

export default OptionsBars;
