import * as Cesium from 'cesium';
import * as mu from '../mapUtil'
import * as turf from '@turf/turf'
import PointLine from './PointLine'

export default class PointSpline extends PointLine {

  constructor(p: {}, viewer: Cesium.Viewer, layer: Cesium.Entity){
    super({type: '顶点平滑曲线', ...p}, viewer, layer)
  }

  calcuteShape (points: Array<Cesium.Entity>, time: Cesium.JulianDate) {
    if (points.length < this.minPointNum) {
      return []
    }
    let linestr = points.map((p) => mu.cartesian2lonlat(p.position.getValue(time)))
    let line = turf.lineString(linestr)
    let curved = turf.bezierSpline(line)
    let geometry = curved.geometry.coordinates
    return geometry.map((p) => mu.lonlat2Cartesian(p))
  }
}
