/*
 * movement.h
 *
 *  Created on: Jan 30, 2024
 *      Author: joshs1
 */

#ifndef MOVEMENT_H_
#define MOVEMENT_H_


//double move_forward (oi_t *sensor_data, double distance_mm);
//
//double turn_right(oi_t *sensor, double degrees);
//
//double turn_left(oi_t *sensor, double degrees);
//
//double collision_setection(oi_t *sensor, double distance_mm);
//
//double move_back (oi_t *sensor_data, double distance_mm);

void putty_print(char arr[], int size);

void putty_scan(int start, int end, cyBOT_Scan_t* getScan);

//void detect_object(float data[],cyBOT_Scan_t* getScan);
//,  cyBOT_Scan_t* getScan
#endif /* MOVEMENT_H_ */
