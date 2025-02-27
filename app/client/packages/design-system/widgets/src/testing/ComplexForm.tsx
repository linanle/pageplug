import * as React from "react";
import {
  Button,
  Text,
  CheckboxGroup,
  Checkbox,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  ButtonGroup,
  Flex,
  SwitchGroup,
  Switch,
  RadioGroup,
  Radio,
  IconButton,
  TextArea,
} from "@design-system/widgets";
// This component is used only for testing purpose and is not used in the prod
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import EmotionHappyLineIcon from "remixicon-react/EmotionHappyLineIcon";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import EmotionUnhappyLineIcon from "remixicon-react/EmotionUnhappyLineIcon";

export const ComplexForm = () => {
  return (
    <Flex direction="column" gap="spacing-6">
      <Flex direction="column" gap="spacing-3">
        <Text variant="heading">Your order</Text>
        <Text>Choose your favorite dishes and place an order.</Text>
      </Flex>

      <Flex direction="column" gap="spacing-5">
        <ButtonGroup>
          <Button>Fast food</Button>
          <Button>Salads</Button>
          <Button>Drinks</Button>
          <Button>Sauces</Button>
        </ButtonGroup>

        <SwitchGroup label="Repeat order">
          <Switch value="value-1">Once a week</Switch>
          <Switch isSelected value="value-2">
            Twice a week
          </Switch>
        </SwitchGroup>

        <CheckboxGroup label="Dishes">
          <Checkbox value="Hamburger">Hamburger</Checkbox>
          <Checkbox value="French fries">French fries</Checkbox>
          <Checkbox value="Coca-Cola">Coca-Cola</Checkbox>
        </CheckboxGroup>

        <RadioGroup label="Portion size">
          <Radio value="s">S</Radio>
          <Radio value="M">M</Radio>
          <Radio value="L">L</Radio>
          <Radio value="XL">XL</Radio>
        </RadioGroup>

        <Flex direction="column" gap="spacing-3">
          <Flex direction="column" gap="spacing-2">
            <Text isBold>Feedback is important to us</Text>
            <Flex>
              <IconButton icon={EmotionHappyLineIcon} variant="ghost" />
              <IconButton icon={EmotionUnhappyLineIcon} variant="ghost" />
            </Flex>
          </Flex>
          <TextArea label="Your comment" />
        </Flex>
      </Flex>

      <Flex gap="spacing-2">
        <TooltipRoot>
          <TooltipTrigger>
            <Button variant="outlined">Cancel</Button>
          </TooltipTrigger>
          <TooltipContent>
            If you cancel, you will lose your order
          </TooltipContent>
        </TooltipRoot>
        <Button>Ok</Button>
      </Flex>
    </Flex>
  );
};
