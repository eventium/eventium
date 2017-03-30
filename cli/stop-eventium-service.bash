# This script will stope eventium service if it is running
if [ $(systemctl is-active eventium) = active ]; then
  echo "Stopping eventium service...\n";
  sudo systemctl stop eventium;
fi;
