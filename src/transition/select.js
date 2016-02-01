import {selector} from "d3-selection";
import {Transition} from "./index";
import {initializeScheduleEntry, getScheduleEntry} from "./schedule";

export default function(select) {
  var id = this._id,
      key = this._key;

  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        initializeScheduleEntry(subgroup[i], key, id, i, subgroup, getScheduleEntry(node, key, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, key, id);
}
