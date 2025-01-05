#!/bin/bash

# Get RPM package count
rpm_count=$(rpm -qa | wc -l)

# Get Flatpak package count
flatpak_count=$(flatpak list 2>/dev/null | wc -l)

echo "$rpm_count (RPM), $flatpak_count (Flatpak)"