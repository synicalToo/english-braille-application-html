import { ThemeSwitcher } from "../providers/themeSwitcher";

import { KeyboardMappingSheet } from "../sheets/keyboardMapping";
import { SettingsSheet } from "../sheets/settings";

export function BottomBar() {
  return (
    <div className="flex justify-center items-center space-x-4 py-4 w-full">
      <KeyboardMappingSheet />
      <SettingsSheet />
      <ThemeSwitcher />
    </div>
  );
}
