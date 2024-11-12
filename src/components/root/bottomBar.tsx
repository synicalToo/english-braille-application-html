import { ThemeSwitcher } from "../providers/themeSwitcher";

import { KeyboardMappingSheet } from "../sheets/keyboardMapping";
import { SettingsSheet } from "../sheets/settings";

export function BottomBar() {
  return (
    <div className="flex items-center space-x-4">
      <KeyboardMappingSheet />
      <SettingsSheet />
      <ThemeSwitcher />

      <hr />
    </div>
  );
}
