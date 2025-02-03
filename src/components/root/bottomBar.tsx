// Shows the three buttons at the bottom of the screen
// Keyboard mapping, settings, and theme switcher

import { ThemeSwitcher } from "../providers/themeSwitcher";

import { KeyboardMappingSheet } from "../sheets/keyboardMapping";
import { SettingsSheet } from "../sheets/settings";
import { ClientsSection } from "../sheets/clients";

export function BottomBar() {
  return (
    <div>
      <div className="flex justify-center items-center space-x-4 py-4 w-full">
        <KeyboardMappingSheet />
        <SettingsSheet />
        <ThemeSwitcher />
      </div>
      <hr />
      <ClientsSection />
    </div>
  );
}
